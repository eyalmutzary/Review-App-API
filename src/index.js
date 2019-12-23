const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const reviewRouter = require('./routers/review')
const movieRouter = require('./routers/movie')


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(movieRouter)
app.use(reviewRouter)


app.listen(port, ()=>{
    console.log("The server is up on port " + port)
})

