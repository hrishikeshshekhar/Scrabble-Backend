/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const env = require('./utils/env')
const { rootRouter } = require('./routes/rootRouter')

// Connecting to the database
mongoose.connect(`${env.mongo_url}`, {
    useNewUrlParser: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', () => {
    console.log('Successfully connected to the db')
})

const app = express()
app.use(cors())

app.use(bodyParser.json())

const server = http.createServer(app)
const io = socketIo(server)

let userCount = 0

// Storing a mapping of all socket id's to username
const idToUserData = new Map()

// Storing all room names
const roomCounts = new Map()

io.on('connection', (socket) => {
    userCount += 1
    console.log('User Count : ', userCount)
    console.log('Room Counts: ', roomCounts)

    // Called right before a user disconnects
    socket.on('disconnecting', () => {
        userCount -= 1
        console.log('User count : ', userCount)
        const id = Object.keys(socket.rooms)[0]

        // Getting user's data
        if (idToUserData.has(id)) {
            const userData = idToUserData.get(id)
            const { room } = userData
            let roomCount = roomCounts.get(room)
            idToUserData.delete(id)

            //  Broadcasting to all sockets that this user has left the chat
            socket.broadcast.to(room).emit('removeUser', userData)

            // Reducing the room count
            roomCounts.set(room, roomCount - 1)

            // If the room count is 0, removing the room name
            roomCount = roomCounts.get(room)
            if (roomCount === 0) {
                roomCounts.delete(room)
            }
        }
    })

    // Called when a room is created
    socket.on('createRoom', (room) => {
        // Setting the room count to 0
        roomCounts.set(room, 0)
    })

    socket.on('addUser', (userData) => {
        // Storing mapping of socket's id to username and room name
        const id = Object.keys(socket.rooms)[0]
        const { room } = userData
        const { username } = userData

        idToUserData.set(id, {
            room,
            username,
        })

        // Adding one to the the room count
        const roomCount = roomCounts.get(room)
        roomCounts.set(room, roomCount + 1)

        // Joining that room
        socket.join(room)

        // Broadcasting to all users in the room
        socket.broadcast.to(room).emit('addUser', userData)
    })

    socket.on('chat', (messageData) => {
        const { room } = messageData

        // Broadcasting to all users in the chat
        socket.broadcast.to(room).emit('chat', messageData)
    })
})

app.use('/', rootRouter)

server.listen(env.port, () => console.log(`Listening on port ${env.port}`))
