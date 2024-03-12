const express = require('express')

const User = require('../lib/User')
const Recipe = require('../lib/Recipe')
const Plan = require('../lib/Plan')
const Admin = require('../lib/Admin')

const router = express.Router()

/**
* Module User
*/
router.post('/api/user/answer', User.CreateDraft)
router.post('/api/user/signup', User.SignUp)
router.get('/api/user/draft', User.GetDraft)
router.put('/api/user/:id', User.Update)

/**
* Module Plans
*/
router.post('/api/plans', Plan.Get)

/**
* Module Admin
*/
router.get('/admin/recipes', Recipe.GetRecipes)
router.post('/admin/recipes', Recipe.CreateRecipe)
router.put('/admin/recipes/:id', Recipe.UpdateRecipe)
router.delete('/admin/recipes/:id', Recipe.RemoveRecipe)
router.get('/admin/users', Admin.GetUsers)

/**
* If not one router not found, send 404
*/
router.use('/api/', (req, res) => { res.sendStatus(404) })

module.exports = router
