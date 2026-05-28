const express = require('express')

const router = express.Router()

const AuthController =
  require('./auth.controller')

const {
  registerSchema,
  loginSchema,
  googleCheckSchema,
  googleRegisterSchema
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

router.post(
  '/google/check',
  validate(googleCheckSchema),
  AuthController.checkGoogleUser
)

router.post(
  '/google/register',
  validate(googleRegisterSchema),
  AuthController.registerGoogle
)

module.exports = router