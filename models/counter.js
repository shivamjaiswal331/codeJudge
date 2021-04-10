const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const counterSchema = Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0, unique: true }

})

const counter = mongoose.model('counter', counterSchema)
module.exports = counter