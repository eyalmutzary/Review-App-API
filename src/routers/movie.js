const express = require('express')
const Movie = require('../models/movie')
const Review = require('../models/review')
const auth = require('../middleware/auth')
const router = new express.Router()

// Creates a new movie
router.post('/movies', auth, async (req, res) => {
    const movie = new Movie({
        ...req.body,
        owner: req.user._id
    })

    try {
        await movie.save()
        res.status(201).send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Gets all the movies (Also by genre -->  ?genres=Drama )
router.get('/movies', async (req,res) => {
    if(req.query.genre){
        try{
            const movies = await Movie.find({ genre: req.query.genre })
            if(!movies){
                res.status(404).send("There are no movies")
            }
            res.send(movies)
        }
        catch(e){
            res.status(500).send()
        }
    }
    else{
        try{
            const movies = await Movie.find()
            if(!movies){
                res.status(404).send("There are no movies")
            }
            res.send(movies)
        }
        catch(e){
            res.status(500).send()
        }
    }
    
})


// Gets a movie by id
router.get('/movies/:id/info', async (req,res) => {
    try{
        const movies = await Movie.findById({ _id: req.params.id })

        if(!movies){
            res.status(404).send("There are no movies in this genre")
        }
        res.send(movies)
    }
    catch(e){
        res.status(500).send()
    }
})


// Get all of the movie reviews by movie id
router.get('/movies/:id/reviews', async (req,res) => {
    try{
        const movies = await Movie.findById({ _id: req.params.id })
        if(!movies){
            res.status(404).send("No Movie Found")
        }

        const movie = await Movie.findById(req.params.id)
        await movie.populate('reviews').execPopulate() 

        if(!movie.reviews){
            res.status(404).send("There are no reviews for this movie")
        }
        res.send(movie.reviews)
    }
    catch(e){
        res.status(500).send()
    }
})


// Deletes a movie and all his reviews 
router.delete('/movies/:id', auth, async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete({ _id: req.params._id })
        res.send(movie)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router