const express = require('express')
const morgan = require('morgan')
const animeRoutes = require('./routes/animeRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/anime', animeRoutes)

module.exports = app