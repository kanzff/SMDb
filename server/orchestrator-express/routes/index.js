const router = require('express').Router()
const movieRouter = require('./movieRoutes')
const { Controller } = require('../controllers/controllers')

router.get('/entertainme', Controller.find)

module.exports = router