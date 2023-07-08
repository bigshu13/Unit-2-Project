const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('This test better work'))
const User = require('../models/User')
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
describe('testing user endpoints', () => {
    test('Creation of new user', async () => {
        const response = await request(app)
        .post('/users')
        .send({ name: 'Shu', email: 'shu@aol.com', password: 'shumama'});
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toMatchObject({ name: 'Shu', email: 'shu@aol.com'});
      console.log(response, 'HELLO')  
    });
//testing the update route
    test('updating of user', async () => {
        const user = new User({
            name: 'Shoe', email: 'shoe@aol.com', password: 'shupapi'
        })
        await user.save()
        console.log(user, 'WORLD')
        const token = await user.generateAuthTokens()
        const response = await request(app)
        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({name: 'Shu', email: 'shu@aol.com', password: 'shumama'})
        console.log(response.body, 'TRUEEE')
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({ name: 'Shu', email: 'shu@aol.com', password: 'shumama'});
  });

//testing the get users route
test('Get the users', async () => {
    const user = new User ({name: 'jorge', email: 'jorge@aol.com', password: 'JokerOP'})
    await user.save()
    const response = await request(app)
    .get('/users')
    console.log(response.body, 'CAPPP')
    expect(response.statusCode).toBe(200)
    });

//testing the delete route
test('delete the users', async () => {
    const user = new User ({name: 'jorge', email: 'jorge@aol.com', password: 'JokerOP'})
    await user.save()
    const token = await user.generateAuthTokens()
    const response = await request(app)
    .delete(`/users/${user._id}`)
    .set('Authorization', `Bearer ${token}`)
    console.log(response.body, 'YEET')
    expect(response.body.message).toEqual('Deleted User')
    expect(response.statusCode).toBe(200)
    });

//testing the specified route
test('get specified user', async () => {
    const user = new User ({name: 'jorge', email: 'jorge@aol.com', password: 'JokerOP'})
    await user.save()
    const token = await user.generateAuthTokens()
    const response = await request(app)
    .get(`/users/${user._id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    });

test('testing the login route', async () => {
    
})    
});