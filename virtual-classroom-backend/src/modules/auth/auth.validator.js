const { z } = require('zod')

const registerSchema = z.object({
  names: z.string().min(2),
  lastNames: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  avatar: z.string().optional(),
  role: z.enum(['ADMIN', 'PARTICIPANT'])
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const googleCheckSchema = z.object({
  uid: z.string().min(1)
})

const googleRegisterSchema =
  z.object({
    uid: z.string().min(1),
    names: z.string().min(2),
    username: z.string().min(3),
    email: z.string().email(),
    avatar: z.string().optional()
  })

module.exports = {
  registerSchema,
  loginSchema,
  googleCheckSchema,
  googleRegisterSchema
}