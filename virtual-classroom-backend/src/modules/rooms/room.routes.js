const express = require('express')

const router = express.Router()

const RoomController = require('./room.controller')

const {
  authMiddleware
} = require('../../middlewares/auth.middleware')

router.post(
  '/',
  authMiddleware,
  RoomController.createRoom
)

router.get(
  '/',
  authMiddleware,
  RoomController.getRooms
)

module.exports = router