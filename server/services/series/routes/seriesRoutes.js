const router = require('express').Router()
const { SeriesController } = require('../controllers/seriesControllers')

router.get('/', SeriesController.find)

router.post('/', SeriesController.create)

router.put('/:id', SeriesController.update)

router.delete('/:id', SeriesController.destroy)

module.exports = router