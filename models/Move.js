const mongoose = require('mongoose')

const { Schema } = mongoose
const Model = mongoose.model

const moveSchema = Schema({
    user: String,
    word: [
        {
            row: Number,
            col: Number,
            letter: String,
        },
    ],
    score: Number,
})

module.exports = {
    Move: Model('Move', moveSchema),
}
