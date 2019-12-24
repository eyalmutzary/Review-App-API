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

test('Should add a new user', async () =>{
    const response = await request(app).post('/users')
    .send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!'
    }).expect(201)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull() // added the user
    expect(user.password).not.toBe("MyPass777") // password encrypted
    
    expect(response.body).toMatchObject({ // added correct details to user
        user: {
            name: 'Andrew',
            email: 'andrew@example.com'
        },
        token: user.tokens[0].token
    })
})


test('Should login an existing user', async () => {
    const response = await request(app).post('/users/login')
        .send({
            email: user1.email,
            password: user1.password
        }).expect(200)
    const user = await User.findById(user1._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not update user if no authenticated', async () => {
    const response = await request(app).patch('/users/profile')
        .send({
            name: "Eran"
        }).expect(401)
})

test('Should not update user with invalid name/email/password', async () => {
    const checkEmail = await request(app).patch('/users/profile')
        .send({
            email: "#@R@#F"
        }).expect(401)
    const checkPassword = await request(app).patch('/users/profile')
        .send({
            password: ""
        }).expect(401)
})