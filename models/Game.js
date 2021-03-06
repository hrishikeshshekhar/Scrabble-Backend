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
        enum: ['LOBBY', 'IN_PROGRESS', 'COMPLETED'],
        default: 'LOBBY',
    },
})

module.exports = mongoose.model('Game', gameSchema)
