const express = require("express")
const env = require("./utils/env")
const http = require("http")
<<<<<<< Updated upstream
const socketIo = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())
=======
<<<<<<< Updated upstream
const socketIo = require("socket.io") 

const app = express()
=======
const socketIo = require("socket.io")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
app.use(cors())
app.use(bodyParser.json())
>>>>>>> Stashed changes
>>>>>>> Stashed changes
const server = http.createServer(app)
const io = socketIo(server)

// Storing a mapping of all socket id's to their userData
// userData has the following format : {
//     room : room,
//     username : username
// }

<<<<<<< Updated upstream
// Storing a mapping of all socket id's to username
let idToUserData = new Map()

// Storing all room names
let roomCounts = new Map()

=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// An endpoint to check if the room name already exists
app.get('/roomExists', (req, res) => {
    let roomName = req.query.roomName
    if (roomCounts.has(roomName) && roomCounts.get(roomName) > 0) {
=======
=======
let idToUserData = new Map()

// Maps room number to room
let roomUsers = new Map()

io.on('connection', (socket) => {
    // Called right before a user disconnects
    socket.on('disconnecting', () => {
        let id = Object.keys(socket.rooms)[0]

        // Getting user's data
        if (idToUserData.has(id)) {
            let userData = idToUserData.get(id)
            let room = userData.room
            let username = userData.username
            let users = roomUsers.get(room)
            idToUserData.delete(id)

            //  Broadcasting to all users in this user's room that this user has left the chat
            socket.broadcast.to(room).emit('removeUser', username)

            // Removing the user from the room
            let new_users = users.filter((user) => user != username)
            if(new_users.length == 0){
                roomUsers.delete(room)
            }else{
                roomUsers.set(room, new_users)
            }
        }
    })

    // Called when a room is created
    socket.on('createRoom', (room) => {
        // Setting the room count to 0
        roomUsers.set(room, [])
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
        let users = roomUsers.get(room)
        users.push(username)
        roomUsers.set(room, users)

        // Joining that room
        socket.join(room)

        // Broadcasting to all users in the room
        socket.broadcast.to(room).emit('addUser', username)
    })

    socket.on('chat', (messageData) => {
        let room = messageData.room
        
        // Broadcasting to all users in the chat
        socket.broadcast.to(room).emit('chat', messageData)
    })
})

// An endpoint to check if the room name already exists
app.get('/roomExists', (req, res) => {
    let room = req.query.room
    if (roomUsers.has(room) && roomUsers.get(room).length > 0) {
>>>>>>> Stashed changes
        return res.json(true).status(200)
    } else {
        return res.json(false).status(200)
    }
})

<<<<<<< Updated upstream
=======
// An endpoint to check whether the change in gameState is valid
app.post('/checkValid', (req, res) => {
    
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

>>>>>>> Stashed changes
>>>>>>> Stashed changes
server.listen(env.port, () => console.log(`Listening on port ${env.port}`))
