const express = require('express')

const gameRouter = express.Router()
const gameController = require('../controllers/game.controller.js')

gameRouter.get('/initialize', gameController.initialize)

module.exports = {
    gameRouter,
}
