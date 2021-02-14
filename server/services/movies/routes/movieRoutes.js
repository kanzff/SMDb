const router = require('express').Router()
const { MovieController } = require('../controllers/movieControllers')

router.get('/', MovieController.find)

router.get('/:id', MovieController.findById)

router.post('/', MovieController.create)

router.put('/:id', MovieController.update)

router.delete('/:id', MovieController.destroy)

module.exports = router