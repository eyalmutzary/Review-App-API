const express = require('express')
const Review = require('../models/review')
const User = require('../models/user')
const Movie = require('../models/movie')
const auth = require('../middleware/auth')
const router = new express.Router()

// Add a review
router.post('/reviews/:id', auth, async (req, res) => {
    const review = new Review({
        ...req.body,
        owner: req.user.id,
        movieRef: req.params.id
    })

    try {
        await review.save()
        res.status(201).send(review)
    } catch (e) {
        res.status(400).send(e)
    }
    res.send()
})


module.exports = router