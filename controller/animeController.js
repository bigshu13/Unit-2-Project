const Anime = require('../models/anime')
const User = require('../models/User')

exports.createAnime = async function(req, res){
    try {
        const anime = await Anime.create(req.body)
        req.user.favorites?
        req.user.favorites.addToSet({ _id: anime._id }):
        req.user.favorites = ({ _id: anime._id })
        await req.user.save()
        res.json(req.user)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}


exports.updateAnime = async function(req, res){
    try {
        const anime = await Anime.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true})
        res.json(anime)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.deleteAnime = async function(req, res){
    try {
         await Anime.findOneAndDelete({ _id: req.params.id })
        res.json({message: 'Deleted Anime' })
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.index = async function(req, res){
    try {
        const animes = await Anime.find({ })
        res.json(animes)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.show = async function(req, res){
    try {
        const anime = await Anime.findOne({ _id: req.params.id })
        res.json(anime)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}