const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const Fruits = mongoose.model('Fruits', fruitSchema)
module.exports = Fruits