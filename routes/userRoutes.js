const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")

//this will create specific user and list
router.post('/', userController.createUser)

//this will get all users info and list
router.get('/', userController.getUser)

//this will get a specific user and list
router.get('/:id', userController.getSpecUser)

//this will update user list
router.put('/:id', userController.updateUser)

//this will delete user
router.delete('/:id', userController.deleteUser)



module.exports = router