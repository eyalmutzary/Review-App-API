const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Movie = require('../../src/models/movie')
const Review = require('../../src/models/review')
const jwt = require('jsonwebtoken')

user1Id = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1Id,
    name: "eyal",
    email: "eyal@eyal.com",
    password: "eyal12345",
    tokens: [
        {
            token: jwt.sign({ _id: user1Id }, process.env.JWT_SECRET)
        }
    ]
}

user2Id = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2Id,
    name: "ran",
    email: "ran@ran.com",
    password: "ran12345",
    tokens: [
        {
            token: jwt.sign({ _id: user2Id }, process.env.JWT_SECRET)
        }
    ]
}

const movie1 = {
    _id: new mongoose.Types.ObjectId(),
    name: "me before you",
    about: "about a girl who walks before someone",
    genre: "Drama",
    year: 2015,
    minutes: 122,
    owner: user1._id
}

const review1 = {
    _id: new mongoose.Types.ObjectId(),
    title: "Great Movie!",
    body: "you must watch it.",
    rating: "8",
    owner: user1._id,
    movieRef: movie1._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Movie.deleteMany()
    await Review.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
    await new Movie(movie1).save()
    await new Review(review1).save()
}


module.exports = {
    user1,
    user2,
    movie1,
    review1,
    setupDatabase
}