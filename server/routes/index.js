const express = require('express')

const User = require('../lib/User')
const Recipe = require('../lib/Recipe')
const Plan = require('../lib/Plan')
const Promo = require('../lib/Promocode')

const router = express.Router()

/**
* Module User
*/
router.post('/api/user/new', User.Create)
router.post('/api/user/answer', User.CreateDraft)
router.post('/api/user/signup', User.SignUp)
router.post('/api/user/restore', User.RestorePassword)
router.post('/api/user/reset', User.ResetPassword)
router.get('/api/user/draft', User.GetDraft)
router.get('/api/user/:id', User.GetById)
router.put('/api/user/:id', User.Update)
router.delete('/api/user/:id', User.Remove)
router.get('/users', User.GetUsers)

/**
* Module Plans
*/
router.get('/api/plans', Plan.GetPlans)
router.post('/api/plans/new', Plan.Create)
router.put('/api/plans/:id', Plan.Update)
router.post('/api/plans', Plan.GetPlan)
router.delete('/api/plans/:id', Plan.Remove)

/**
* Module Promocodes
*/
router.get('/api/promo', Promo.Get)
router.post('/api/promo', Promo.Create)
router.put('/api/promo/:id', Promo.Update)
router.delete('/api/promo/:id', Promo.Remove)

/**
* Module Recipes
*/
router.get('/recipes', Recipe.Get)
router.post('/recipes', Recipe.Create)
router.put('/recipes/:id', Recipe.Update)
router.delete('/recipes/:id', Recipe.Remove)

/**
* If not one router not found, send 404
*/
router.use('/api/', (req, res) => { res.sendStatus(404) })

module.exports = router
