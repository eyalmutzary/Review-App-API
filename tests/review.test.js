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

test('Should add review', async () => {
    const response = await request(app).post(`/reviews/${movie1._id}`)
        .set('Authorization', `Bearer `+user1.tokens[0].token)
        .send({
            title: "Awsome",
            body: "you must watch!",
            rating: "9",
        }).expect(201)
})

test('Should not add review if not authenticated', async () => {
    const response = await request(app).post(`/reviews/${movie1._id}`)
        .send({
            title: "Awsome",
            body: "you must watch!",
            rating: "9",
        }).expect(401)
})