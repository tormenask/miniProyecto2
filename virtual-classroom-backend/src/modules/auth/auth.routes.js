const express = require('express')

const router = express.Router()

const AuthController = require('./auth.controller')

const {
  registerSchema,
  loginSchema
} = require('./auth.validator')

const {
  validate
} = require('../../middlewares/validate.middleware')

router.post(
  '/register',
  validate(registerSchema),
  AuthController.register
)

router.post(
  '/login',
  validate(loginSchema),
  AuthController.login
)

module.exports = router