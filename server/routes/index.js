const express = require('express')

const User = require('../lib/User')

const router = express.Router()

// /**
//  * Module User
//  */
router.post('/api/user/answer', User.Answer)
router.get('/api/user/draft', User.GetDraft)

// /**
//  * If not one router not found, send 404
//  */
router.use('/api/', (req, res) => { res.sendStatus(404) })

module.exports = router
