require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}



exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ user: req.body.user })
        res.json({ user, message: 'These are the Goats' })
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.getSpecUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json({ user, message: 'We got the Id sir'})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        const updates = Object.keys(req.body)
        if(!user || !updates){
            throw new Error('User not found')
        }else{
            updates.forEach((update) => (user[update] = req.body[update]))
            await user.save()
            res.json({ user, message: 'We updated Sir'})
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        await user.deleteOne()
        res.json({ message: 'Deleted User' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}