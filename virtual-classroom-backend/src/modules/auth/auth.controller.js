const AuthService = require('./auth.service')

class AuthController {

  static async register(req, res) {
    try {

      const result =
        await AuthService.register(req.body)

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      })

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      })

    }
  }

  static async login(req, res) {
    try {

      const result =
        await AuthService.login(
          req.body.email,
          req.body.password
        )

      return res.json({
        success: true,
        message: 'Login successful',
        data: result
      })

    } catch (error) {

      return res.status(401).json({
        success: false,
        message: error.message
      })

    }
  }

  static async checkGoogleUser(req, res) {
    try {

      const result =
        await AuthService.checkGoogleUser(
          req.body.uid
        )

      return res.json({
        success: true,
        data: result
      })

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      })

    }
  }

  static async registerGoogle(req, res) {
    try {

      const result =
        await AuthService.registerGoogle(
          req.body
        )

      return res.status(201).json({
        success: true,
        message:
          'Google user registered successfully',
        data: result
      })

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      })

    }
  }
}

module.exports = AuthController