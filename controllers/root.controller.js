const env = require('../utils/env')

const backendTest = async (req, res) => {
    // eslint-disable-next-line no-console
    console.log('The backend is up')
    res.send(`The backend is up on port : ${env.port}`)
}

const logServerDetails = async (req, res) => {
    res.status(200).send(env)
}

module.exports = {
    backendTest,
    logServerDetails,
}
