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

    // 2. Validar duplicados en Firestore
    const usernameExists = await db.collection('users').where('username', '==', data.username).get();
    if (!usernameExists.empty) throw new Error('El nombre de usuario ya existe');

    const emailExists = await db.collection('users').where('email', '==', data.email).get();
    if (!emailExists.empty) throw new Error('El correo electrónico ya existe');

    // 3. Validar longitud mínima de contraseña para Firebase
    if (data.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // URL por defecto con DiceBear
    let avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${cleanUsername}`;

    // 4. Procesar la imagen si viene en formato Base64 string
    if (data.avatar && data.avatar.startsWith('data:image')) {
      try {
        const fileName = `avatars/${Date.now()}_${cleanUsername}`;
        const blob = bucket.file(fileName);

        // Extraer el tipo de contenido (mime type) y limpiar el string base64
        const mimeType = data.avatar.split(';')[0].split(':')[1]; // Ej: image/png
        const base64Data = data.avatar.replace(/^data:image\/\w+;base64,/, "");

        // Convertir el texto Base64 a un buffer binario ejecutable por Firebase Storage
        const imageBuffer = Buffer.from(base64Data, 'base64');

        const blobStream = blob.createWriteStream({
          metadata: { contentType: mimeType }
        });

        await new Promise((resolve, reject) => {
          blobStream.on('error', (err) => reject(err));
          blobStream.on('finish', async () => {
            await blob.makePublic();
            avatarUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve();
          });
          blobStream.end(imageBuffer);
        });
      } catch (storageError) {
        console.error("Error subiendo Base64 a Storage, se usará default:", storageError.message);
      }
    }

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

    // Remover password antes de enviar
    delete user.password

    return {
      token,
      user
    }
  }
}

module.exports = AuthService