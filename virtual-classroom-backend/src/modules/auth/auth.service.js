const bcrypt = require('bcryptjs')

const { db, auth } = require('../../config/firebase')

const { generateToken } = require('../../utils/jwt')

class AuthService {


  static async register(data) {

    if (
      !data ||
      !data.username ||
      !data.email ||
      !data.password
    ) {
      throw new Error(
        'Faltan campos requeridos'
      )
    }

    const cleanUsername =
      data.username.replace(/\s+/g, '')

    const usernameExists = await db
      .collection('users')
      .where('username', '==', data.username)
      .get()

    if (!usernameExists.empty) {
      throw new Error(
        'El nombre de usuario ya existe'
      )
    }

    const emailExists = await db
      .collection('users')
      .where('email', '==', data.email)
      .get()

    if (!emailExists.empty) {
      throw new Error(
        'El correo electrónico ya existe'
      )
    }

    if (data.password.length < 6) {
      throw new Error(
        'La contraseña debe tener al menos 6 caracteres'
      )
    }

    const avatarUrl =
      `https://api.dicebear.com/9.x/initials/svg?seed=${cleanUsername}`

    const hashedPassword =
      await bcrypt.hash(data.password, 10)

    const userRecord =
      await auth.createUser({
        email: data.email,
        password: data.password,
        displayName:
          `${data.names || ''} ${data.lastNames || ''}`.trim(),
        photoURL: avatarUrl
      })

    const userData = {
      uid: userRecord.uid,
      names: data.names || '',
      lastNames: data.lastNames || '',
      username: data.username,
      email: data.email,
      avatar: avatarUrl,
      role: data.role || 'PARTICIPANT',
      provider: 'email',
      password: hashedPassword,
      createdAt: new Date()
    }

    await db
      .collection('users')
      .doc(userRecord.uid)
      .set(userData)

    const token = generateToken({
      uid: userRecord.uid,
      role: userData.role
    })

    delete userData.password

    return {
      token,
      user: userData
    }
  }


  static async checkGoogleUser(uid) {

    const userDoc = await db
      .collection('users')
      .doc(uid)
      .get()

    if (!userDoc.exists) {
      return {
        exists: false
      }
    }

    const user = userDoc.data()

    const token = generateToken({
      uid: user.uid,
      role: user.role
    })

    return {
      exists: true,
      token,
      user
    }
  }

  static async registerGoogle(data) {

    if (
      !data ||
      !data.uid ||
      !data.email ||
      !data.username
    ) {
      throw new Error(
        'Faltan campos requeridos'
      )
    }


    const usernameExists = await db
      .collection('users')
      .where('username', '==', data.username)
      .get()

    if (!usernameExists.empty) {
      throw new Error(
        'El nombre de usuario ya existe'
      )
    }

    const emailExists = await db
      .collection('users')
      .where('email', '==', data.email)
      .get()

    if (!emailExists.empty) {
      throw new Error(
        'El correo electrónico ya existe'
      )
    }

    const userData = {
      uid: data.uid,
      names: data.names || '',
      lastNames: data.lastNames || '',
      username: data.username,
      email: data.email,
      avatar:
        data.avatar ||
        `https://api.dicebear.com/9.x/initials/svg?seed=${data.username}`,
      role: 'PARTICIPANT',
      provider: 'google',
      createdAt: new Date()
    }


    await db
      .collection('users')
      .doc(data.uid)
      .set(userData)

    const token = generateToken({
      uid: data.uid,
      role: userData.role
    })

    return {
      token,
      user: userData
    }
  }



  static async login(email, password) {

    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get()

    if (snapshot.empty) {
      throw new Error(
        'Credenciales inválidas'
      )
    }

    const user =
      snapshot.docs[0].data()

    if (user.provider === 'google') {
      throw new Error(
        'Esta cuenta usa Google Login'
      )
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!validPassword) {
      throw new Error(
        'Credenciales inválidas'
      )
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