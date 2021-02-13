const router = require('express').Router()
const movieRouter = require('./movieRoutes')
const seriesRouter = require('./seriesRoutes')
const { Controller } = require('../controllers/controllers')

router.get('/entertainme', Controller.find)

router.use('/movies', movieRouter)

router.use('/series', seriesRouter)

module.exports = router