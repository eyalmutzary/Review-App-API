const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {
    user1,
    user2,
    movie1,
    review1,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)



test('Should add movie', async () => {
    const response = await request(app).post('/movies')
        .set('Authorization', `Bearer `+user1.tokens[0].token)
        .send({
            name: "fall of the titans",
            about: "titanfall",
            genre: "Drama"
        }).expect(201)
})

test('Should not add movie if not authenticated', async () => {
    const response = await request(app).post('/movies')
        .send({
            name: "fall of the titans",
            about: "titanfall",
            genre: "Drama"
        }).expect(401)
})