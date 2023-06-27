const Anime = require('../model/anime')
const jwt = require('jsonwebtoken')

exports.createAnime = async (req, res) => {
    try {
        const anime = new Anime(req.body)
        await anime.save()
        res.json(anime)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.getAnime = async (req, res) => {
    try {
        const anime = await Anime.findOne({ top_5: req.body.top_5 })
        res.json({ anime, message: 'These are the Goats' })
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.getSpecAnime = async (req, res) => {
    try {
        const anime = await Anime.findById(req.params.id)
        res.json({ anime, message: 'We got the Id sir'})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateAnime = async (req, res) => {
    try {
        const anime = await Anime.findOne({_id: req.params.id})
        const updates = Object.keys(req.body)
        if(!anime || !updates){
            throw new Error('Anime not found')
        }else{
            updates.forEach((update) => (anime[update] = req.body[update]))
            await anime.save()
            res.json({ anime, message: 'We updated Sir'})
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteAnime = async (req, res) => {
    try {
        const anime = await Anime.find().deleteOne()
        res.json({ message: 'Deleted Anime' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}