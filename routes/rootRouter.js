const express = require('express')

const rootRouter = express.Router()
const rootController = require('../controllers/root.controller.js')

rootRouter.get('/', rootController.backendTest)

rootRouter.get('/test', rootController.logServerDetails)

module.exports = {
    rootRouter,
}
