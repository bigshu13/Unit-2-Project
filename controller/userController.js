require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        if(!user){ 
            throw new Error('Not Authorized')}
            req.user = user
            next()
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}


exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthTokens()
        res.json({ user, token })
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.find({ user: req.body.user }).populate('favorites')
        res.json({ user, message: 'These are the Goats' })
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

exports.getSpecUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('favorites')
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
            updates.forEach(update => req.user[update] = req.body[update])
            await user.save()
            res.json(req.user)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.id})
        //await user.deleteOne()
        res.json({ message: 'Deleted User' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            throw new error('Wrong Login Info')
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//exports.logoutUser = async (req, res) => {
  //  try {
    //    const user = await 
    //} catch (error) {
        
    //}
//}