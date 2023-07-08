const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { timeStamp } = require('console')
const secret = process.env.SECRET_KEY

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    loggedIn: {type: Boolean, default: false},
    favorites: [{type: mongoose.Schema.Types.ObjectId , ref: 'Anime'}]
}, {
    timeStamps: true
})

userSchema.pre('save', async function(next){
    this.isModified('password')?
    this.password = await bcrypt.hash(this.password, 8):
    //null;
    next()
})

userSchema.methods.generateAuthTokens = async function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET)
    return token
}

const User = mongoose.model('User', userSchema)


module.exports = User