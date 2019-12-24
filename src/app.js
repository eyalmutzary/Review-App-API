const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const reviewRouter = require('./routers/review')
const movieRouter = require('./routers/movie')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(movieRouter)
app.use(reviewRouter)

module.exports = app