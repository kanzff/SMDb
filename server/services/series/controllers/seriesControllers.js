const { MongoClient } = require('mongodb')
const { Series } = require('../models/series')

class SeriesController {
  static async find(req, res) {
    try {
      const series = await Series.find()
      res.status(200).json(series)
    } catch(err) {
      console.log(err)
    }
  }

  static async create(req, res) {
    try {
      const series = await Series.create(req.body)
      res.status(201).json(series.ops[0])
    } catch(err) {
      console.log(err)
    }
  }

  static async update(req, res) {
    const id = req.params.id
    try {
      const series = await Series.update(id, req.body)
      res.status(200).json(series.value)
    } catch(err) {
      console.log(err)
    }
  }

  static async destroy(req, res) {
    const id = req.params.id
    try {
      const series = await Series.destroy(id)
      res.status(200).json(series.value)
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = { SeriesController }