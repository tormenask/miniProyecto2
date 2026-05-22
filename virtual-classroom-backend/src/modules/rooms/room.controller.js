const { db } = require('../../config/firebase')

class RoomController {
  static async createRoom(req, res) {
    try {
      const room = {
        name: req.body.name,
        ownerId: req.user.uid,
        createdAt: new Date()
      }

      const doc = await db
        .collection('rooms')
        .add(room)

      return res.status(201).json({
        success: true,
        message: 'Room created',
        data: {
          id: doc.id,
          ...room
        }
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }

  static async getRooms(req, res) {
    try {
      const snapshot = await db
        .collection('rooms')
        .get()

      const rooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return res.json({
        success: true,
        data: rooms
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

module.exports = RoomController