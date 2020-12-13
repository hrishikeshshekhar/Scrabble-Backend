const express = require('express')

const roomRouter = express.Router()
const roomController = require('../controllers/room.controller.js')

roomRouter.get('/getRoomInfo', roomController.getRoomInfo)

roomRouter.get(
    '/joinRoom',
    roomController.checkValidityforJoin,
    roomController.joinRoom
)

roomRouter.get(
    '/createRoom',
    roomController.checkValidityforCreate,
    roomController.createRoom
)

module.exports = {
    roomRouter,
}
