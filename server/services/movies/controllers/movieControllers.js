const { MongoClient } = require('mongodb')
const { Movie } = require('../models/movie')

class MovieController {
  static async find(req, res) {
    try {
      const movies = await Movie.find()
      res.status(200).json(movies)
    } catch(err) {
      console.log(err)
    }
  }

  static async create(req, res) {
    try {
      const movie = await Movie.create(req.body)
      res.status(201).json(movie.ops[0])
    } catch(err) {
      console.log(err)
    }
  }

  static async update(req, res) {
    const id = req.params.id
    try {
      const movie = await Movie.update(id, req.body)
      res.status(200).json(movie.value)
    } catch(err) {
      console.log(err)
    }
  }

  static async destroy(req, res) {
    const id = req.params.id
    try {
      const movie = await Movie.destroy(id)
      res.status(200).json(movie.value)
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = { MovieController }