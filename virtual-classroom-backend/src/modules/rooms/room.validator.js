const { body, param } = require('express-validator');

const createRoomValidator = [
  body('name')
    .notEmpty()
    .withMessage('El nombre de la sala es obligatorio')
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener mínimo 3 caracteres'),

  body('hostId')
    .notEmpty()
    .withMessage('El hostId es obligatorio'),
];

const roomIdValidator = [
  param('roomId')
    .notEmpty()
    .withMessage('El ID de la sala es obligatorio'),
];

const joinRoomValidator = [
  param('roomId')
    .notEmpty()
    .withMessage('El ID de la sala es obligatorio'),

  body('userId')
    .notEmpty()
    .withMessage('El userId es obligatorio'),
];

module.exports = {
  createRoomValidator,
  roomIdValidator,
  joinRoomValidator,
};