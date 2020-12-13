const mongoose = require('mongoose')

const { Schema } = mongoose
const Model = mongoose.model

const userSchema = Schema({
    username: String,
    score: { type: Number, default: 0 },
})

module.exports = {
    User: Model('User', userSchema),
}
