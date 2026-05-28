const bcrypt = require('bcryptjs')

const { db, auth } = require('../../config/firebase')

const { generateToken } = require('../../utils/jwt')

class AuthService {

  static async register(data) {
    // 1. Validar campos requeridos de texto
    if (!data || !data.username || !data.email || !data.password) {
      throw new Error('Faltan campos requeridos (username, email o password)');
    }

    const cleanUsername = data.username.replace(/\s+/g, '');

    const usernameExists = await db.collection('users').where('username', '==', data.username).get();
    if (!usernameExists.empty) throw new Error('El nombre de usuario ya existe');

    const emailExists = await db.collection('users').where('email', '==', data.email).get();
    if (!emailExists.empty) throw new Error('El correo electrónico ya existe');

    if (data.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    let avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${cleanUsername}`;

    // 5. Encriptar contraseña para tu base de datos local
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 6. Crear usuario en Firebase Auth
    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName: `${data.names || ''} ${data.lastNames || ''}`.trim(),
      photoURL: avatarUrl
    });

    // 7. Guardar registro en Firestore
    const userData = {
      uid: userRecord.uid,
      names: data.names || '',
      lastNames: data.lastNames || '',
      username: data.username,
      email: data.email,
      avatar: avatarUrl,
      role: data.role || 'PARTICIPANT',
      password: hashedPassword,
      createdAt: new Date()
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    // 8. Generar Token y retornar
    const token = generateToken({ uid: userRecord.uid, role: userData.role });
    const { password: _, ...safeUser } = userData;

    return { token, user: safeUser };
  }

  static async login(email, password) {

    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get()

    if (snapshot.empty) {
      throw new Error('Invalid credentials')
    }

    const user = snapshot.docs[0].data()

    const validPassword = await bcrypt.compare(
      password,
      user.password
    )

    if (!validPassword) {
      throw new Error('Invalid credentials')
    }

    const token = generateToken({
      uid: user.uid,
      role: user.role
    })

    delete user.password

    return {
      token,
      user
    }
  }
}

module.exports = AuthService