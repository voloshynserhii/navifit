const express = require('express')

const User = require('../lib/User')
const Plan = require('../lib/Plan')
const Admin = require('../lib/Admin')

const router = express.Router()

/**
* Module User
*/
router.post('/api/user/answer', User.CreateDraft)
router.post('/api/user/signup', User.SignUp)
router.get('/api/user/draft', User.GetDraft)

/**
* Module Plans
*/
router.post('/api/plans', Plan.Get)

/**
* Module Admin
*/
router.get('/admin/recipes', Admin.GetRecipes)
router.get('/admin/users', Admin.GetUsers)

/**
* If not one router not found, send 404
*/
router.use('/api/', (req, res) => { res.sendStatus(404) })

module.exports = router
