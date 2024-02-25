const express = require('express')

const User = require('../lib/User')
const Plan = require('../lib/Plan')

const router = express.Router()

/**
* Module User
*/
router.post('/api/user/answer', User.CreateDraft)
router.get('/api/user/draft', User.GetDraft)

/**
* Module Plans
*/
router.post('/api/plans', Plan.Get)

/**
* If not one router not found, send 404
*/
router.use('/api/', (req, res) => { res.sendStatus(404) })

module.exports = router
