const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 30
    },
    about: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    year: {
        type: Number,
    },
    minutes:{
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},{
    timestamps: true
})

movieSchema.virtual('reviews',{
    ref: "Review",
    localField: "_id",
    foreignField: "movieRef"
})


const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie