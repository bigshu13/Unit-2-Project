const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('This test better work'))
const User = require('../models/User')
//const { describe } = require('yargs')
let mongoServer
