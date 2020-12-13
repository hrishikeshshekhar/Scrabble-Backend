const mongoose = require('mongoose')

const { Schema } = mongoose
const Model = mongoose.model

const roomSchema = Schema({
    socketId: String,
    roomId: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    state: {
        type: String,
        enum: ['NOT_STARTED', 'IN_PROGRESS'],
        default: 'NOT_STARTED',
    },
})

module.exports = {
    Room: Model('Room', roomSchema),
}
