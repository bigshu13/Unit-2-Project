const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    genre: {type: String, required: true},
    rating: Number,
    description: {type: String, required: false}
},{
    timestamps: true
}
)

const Anime = mongoose.model('Anime', animeSchema)

module.exports = Anime