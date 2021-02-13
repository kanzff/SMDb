const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const { MovieController } = require('./movieControllers')
const { SeriesController } = require('./seriesControllers')

class Controller {
  static async find(req, res) {
    let movieSeries = {
      movies: [],
      series: []
    }   
    try {
      movieSeries.movies = await MovieController.findMovies()
      movieSeries.series = await SeriesController.findSeries()
      res.status(200).json(movieSeries)
    } catch (err) {
      console.log(err)
    }


  }
}

module.exports = { Controller }