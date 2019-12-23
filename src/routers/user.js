const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Sign up
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

// Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        currentToken = req.headers.authorization.replace('Bearer ', '')
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== currentToken
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


// Logout from all users
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//Update all user's details
router.patch('/users/profile', auth, async (req, res) => {
    const updatesKeys = Object.keys(req.body) // find the keys of the updates (name, age etc..)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updatesKeys.every((key) => allowedUpdates.includes(key))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updatesKeys.forEach((key) => req.user[key] = req.body[key])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all user's details
router.get('/users/profile', auth, async (req, res) => {
    res.send(req.user)
})


module.exports = router