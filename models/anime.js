const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    genre: {type: String, required: true},
    rating: 4.5,
    description: {type: String, required: false},
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User'}
},{
    timestamps: true
}
)

const Anime = mongoose.model('Anime', animeSchema)

module.exports = Anime