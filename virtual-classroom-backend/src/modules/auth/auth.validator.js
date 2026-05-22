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

module.exports = {
  registerSchema,
  loginSchema
}