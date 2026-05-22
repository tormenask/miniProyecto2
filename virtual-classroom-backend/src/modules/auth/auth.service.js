const bcrypt = require('bcryptjs')

const { db, auth } = require('../../config/firebase')

const { generateToken } = require('../../utils/jwt')

class AuthService {

  static async register(data) {

    const usernameExists = await db
      .collection('users')
      .where('username', '==', data.username)
      .get()

    if (!usernameExists.empty) {
      throw new Error('Username already exists')
    }
    

    const emailExists = await db
      .collection('users')
      .where('email', '==', data.email)
      .get()

    if (!emailExists.empty) {
      throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    )
    console.log(data.username.replace(/\s+/g, ''))
    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName: `${data.names} ${data.lastNames}`,
      photoURL:
        data.avatar ||
        `https://api.dicebear.com/9.x/initials/svg?seed=${data.username.replace(/\s+/g, '')}`
    })

    const userData = {
      uid: userRecord.uid,
      names: data.names,
      lastNames: data.lastNames,
      username: data.username,
      email: data.email,
      avatar: data.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${data.username.replace(/\s+/g, '')}`,
      role: data.role,
      password: hashedPassword,
      createdAt: new Date()
    }

    await db
      .collection('users')
      .doc(userRecord.uid)
      .set(userData)

    const token = generateToken({
      uid: userRecord.uid,
      role: data.role
    })

    const safeUser = {
      uid: userData.uid,
      names: userData.names,
      lastNames: userData.lastNames,
      username: userData.username,
      email: userData.email,
      avatar: userData.avatar,
      role: userData.role,
      createdAt: userData.createdAt
    }

    return {
      token,
      user: safeUser
    }
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