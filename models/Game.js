const mongoose = require('mongoose')

const { Schema } = mongoose

const gameSchema = new Schema({
    tileState: String,
    boardState: String,
    player: [String],
    spectator: [String],
    socketId: String,
    turn: Number,
    move: [{ type: Schema.Types.ObjectId, ref: 'Move' }],
    state: {
        type: String,
        enum: ['IN_PROGRESS', 'COMPLETED'],
        default: 'IN_PROGRESS',
    },
})

module.exports = mongoose.model('Game', gameSchema)
