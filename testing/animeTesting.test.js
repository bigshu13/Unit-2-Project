const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8081, () => console.log('This test better work'))
const User = require('../models/User')
const Anime = require('../models/anime')
//const { describe } = require('yargs')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterEach(async () => {
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})
//testing the create route
describe('testing anime endpoints', () => {
    test('Creation of new anime', async () => {
        const user = new User({
            name: 'Shoe', email: 'shoe@aol.com', password: 'shupapi'
        })
        await user.save()

        const token = await user.generateAuthTokens()
        const response = await request(app)
            .post('/animes')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'bleach', genre: 'action', description: 'cool' });
            console.log(response.body, 'HELLO')
        expect(response.statusCode).toBe(200);
        expect(response.body.favorites.length).toBe(1); 
    });

    //testing the update route
    test('updating of anime', async () => {
        const anime = new Anime({
            title: 'bleach', genre: 'action', description: 'cool'
        })
        await anime.save()
        //console.log(anime, 'WORLD')

        const response = await request(app)
            .put(`/animes/${anime._id}`)
            .send({ title: 'naruto', genre: 'drama', description: 'awesome' })
        console.log(response.body, 'TRUEEE')
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ title: 'naruto', genre: 'drama', description: 'awesome' });
    });

    //testing the get users route
    test('Get the animes', async () => {
        const anime = new Anime({ title: 'bleach', genre: 'action', description: 'cool' })
        await anime.save()

        const response = await request(app)
            .get('/animes')
        //console.log(response.body, 'CAPPP')
        expect(response.statusCode).toBe(200)
    });

    //testing the delete route
    test('delete the animes', async () => {
        const anime = new Anime({ title: 'bleach', genre: 'action', description: 'cool' })
        await anime.save()

        const response = await request(app)
            .delete(`/animes/${anime._id}`)
        //console.log(response.body, 'YEET')
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Deleted Anime')
        
    });

    //testing the specified route
    test('get specified anime', async () => {
        const anime = new Anime({ title: 'bleach', genre: 'action', description: 'cool' })
        await anime.save()

        const response = await request(app)
            .get(`/animes/${anime._id}`)
        expect(response.statusCode).toBe(200)
    });
});