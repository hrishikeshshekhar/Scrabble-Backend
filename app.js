const express = require("express")
const env = require("./utils/env")
const http = require("http")
const socketIo = require("socket.io") 

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

let userCount = 0

io.on('connection', (socket) => {
    userCount += 1
    console.log("User Count : ", userCount)
    
    socket.on('disconnect', () => {
        userCount -= 1
        console.log("User Count : ", userCount)
    })

    socket.on('addUser', (userData) => {
        socket.broadcast.emit('addUser', userData)
    })

    socket.on('chat', (messageData) => {
        socket.broadcast.emit('chat', messageData)
    })
})

server.listen(env.port, () => console.log(`Listening on port ${env.port}`))
