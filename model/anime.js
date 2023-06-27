const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const animeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    genre: String,
    top_5: ("String", "String", "String", "String", "String"),
    completion: {type: Boolean, default: false}
})

const Anime = mongoose.model('Anime', animeSchema)


module.exports = Anime