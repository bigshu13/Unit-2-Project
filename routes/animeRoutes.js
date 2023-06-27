const express = require('express')
const router = express.Router()
const animeController = require("../controller/animeController")

//this will create specific user and list
router.post('/', animeController.createAnime)

//this will get all users info and list
router.get('/', animeController.getAnime)

//this will get a specific user and list
router.get('/:id', animeController.getSpecAnime)

//this will update user list
router.put('/:id', animeController.updateAnime)

//this will delete user
router.delete('/:id', animeController.deleteAnime)



module.exports = router