const { Room } = require('../models/Room')
const { User } = require('../models/User')

const getRoomInfo = async (req, res) => {
    const roomInfo = await Room.find({})
    return res.json({
        roomInfo,
        code: 200,
    })
}

const checkValidityforCreate = async (req, res, next) => {
    const { roomId } = req.body

    const roomInfo = await Room.findOne({ roomId })
    if (roomInfo) {
        return res.json({
            message: 'There is already a room with this id.',
            code: 401,
        })
    }
    return next()
}

const createRoom = async (req, res) => {
    const { roomId } = req.body
    const { username } = req.body

    const user = new User()
    user.username = username
    await user.save()

    // What to do about room socket ID
    const room = new Room()
    room.roomId = roomId
    room.members.push(user._id)
    room.owner = user._id
    await room.save()

    return res.json({
        message: 'Room successfully created',
        code: 200,
    })
}

const checkValidityforJoin = async (req, res, next) => {
    const { roomId } = req.body
    const { username } = req.body

    const roomInfo = await Room.findOne({ roomId }).populate('members')
    if (!roomInfo) {
        return res.json({
            message: 'No such room exists.',
            code: 400,
        })
    }
    for (let i = 0; i < roomInfo.members.length; i += 1) {
        if (roomInfo.members[i].username === username) {
            return res.json({
                message: 'There is already a member with this username.',
                code: 401,
            })
        }
    }
    return next()
}

const joinRoom = async (req, res) => {
    const { roomId } = req.body
    const { username } = req.body

    const user = new User()
    user.username = username
    await user.save()

    const roomInfo = await Room.findOne({ roomId }).populate('members')
    roomInfo.members.push(user._id)
    await roomInfo.save()

    return res.json({
        message: 'Request successful',
        code: 200,
    })
}

module.exports = {
    getRoomInfo,
    joinRoom,
    checkValidityforJoin,
    createRoom,
    checkValidityforCreate,
}
