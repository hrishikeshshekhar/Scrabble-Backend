const express = require("express")
const env = require("./utils/env")
const http = require("http")
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
const server = http.createServer(app)
const io = socketIo(server)

// Storing a mapping of all socket id's to their userData
// userData has the following format : {
//     room : room,
//     username : username
// }

<<<<<<< Updated upstream
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
        return res.json(true).status(200)
    } else {
        return res.json(false).status(200)
    }
})

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
server.listen(env.port, () => console.log(`Listening on port ${env.port}`))
