//pulls from .env and makes it availble in server.js
require('dotenv').config()

const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log('Mongo is hanging high'))

app.listen(PORT, () => {
    console.log(`Andre ${PORT} is top tier`)
})