const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    rating: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0 || value > 10) {
                throw new Error('Wrong rating input.')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    movieRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    }
},{
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review