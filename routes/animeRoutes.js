const express = require('express')
const router = express.Router()
const animeController = require('../controller/animeController')
const userController = require("../controller/userController");

//this will create specific anime 
router.post('/',userController.auth, animeController.createAnime)

//this will get all anime info and list
router.get('/', animeController.index)

//this will get a specific user and list
router.get('/:id', animeController.show)

//this will update anime list
router.put('/:id', animeController.updateAnime)

//this will delete anime
router.delete('/:id', animeController.deleteAnime)

module.exports = router