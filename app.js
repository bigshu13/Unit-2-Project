const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const animeRoutes = require('./routes/animeRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/animes', animeRoutes)

module.exports = app