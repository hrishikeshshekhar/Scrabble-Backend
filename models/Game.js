const mongoose = require('mongoose')

const { Schema } = mongoose
const Model = mongoose.model

const gameSchema = Schema({
    tileState: String,
    boardState: String,
    player: [String],
    spectator: [String],
    turn: Number,
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    move: [{ type: Schema.Types.ObjectId, ref: 'Move' }],
    state: {
        type: String,
        enum: ['IN_PROGRESS', 'COMPLETED'],
        default: 'IN_PROGRESS',
    },
})

module.exports = {
    Game: Model('Game', gameSchema),
}
