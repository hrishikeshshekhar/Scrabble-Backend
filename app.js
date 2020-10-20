const express = require("express")
const env = require("./utils/env")
const http = require("http")
const socketIo = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())

const bodyParser = require("body-parser")
app.use(bodyParser.json())

const server = http.createServer(app)
const io = socketIo(server)

let userCount = 0

// Storing a mapping of all socket id's to username
let idToUserData = new Map()

// Storing all room names
let roomCounts = new Map()

io.on('connection', (socket) => {
    userCount += 1
    console.log("User Count : ", userCount)
    console.log("Room Counts: ", roomCounts)

    // Called right before a user disconnects
    socket.on('disconnecting', () => {
        userCount -= 1
        console.log("User count : ", userCount)
        let id = Object.keys(socket.rooms)[0]

        // Getting user's data
        if (idToUserData.has(id)) {
            let userData = idToUserData.get(id)
            let room = userData.room
            let roomCount = roomCounts.get(room)
            idToUserData.delete(id)

            //  Broadcasting to all sockets that this user has left the chat
            socket.broadcast.to(room).emit('removeUser', userData)

            // Reducing the room count
            roomCounts.set(room, roomCount - 1)

            // If the room count is 0, removing the room name
            roomCount = roomCounts.get(room)
            if (roomCount == 0) {
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
        let id = Object.keys(socket.rooms)[0]
        let room = userData.room
        let username = userData.username

        idToUserData.set(id, {
            room: room,
            username: username
        })

        // Adding one to the the room count
        let roomCount = roomCounts.get(room)
        roomCounts.set(room, roomCount + 1)

        // Joining that room
        socket.join(room)

        // Broadcasting to all users in the room
        socket.broadcast.to(room).emit('addUser', userData)
    })

    socket.on('chat', (messageData) => {
        let room = messageData.room

        // Broadcasting to all users in the chat
        socket.broadcast.to(room).emit('chat', messageData)
    })
})

// An endpoint to check if the room name already exists
app.get('/roomExists', (req, res) => {
    let roomName = req.query.roomName
    if (roomCounts.has(roomName) && roomCounts.get(roomName) > 0) {
        return res.json(true).status(200)
    } else {
        return res.json(false).status(200)
    }
})

// An endpoint to return which all users are there in a room
app.post('/getUsers', (req, res) => {
    let room = req.body.room
    if(roomUsers.has(room) && roomUsers.get(room).length > 0){
        return res.json({players : roomUsers.get(room)})
    }else{
        return res.json({players : []})
    }
})

server.listen(env.port, () => console.log(`Listening on port ${env.port}`))
