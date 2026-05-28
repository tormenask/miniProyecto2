const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const authRoutes = require('./modules/auth/auth.routes')
const roomRoutes = require('./modules/rooms/room.routes')

const app = express()

app.use(cors())

app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Virtual Classroom API Running 🚀'
  })
})

module.exports = app