const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class SeriesController {
  static async findSeries() {
    try {
      const seriesData = await redis.get('series:data')
      if (seriesData) {
        // console.log('dari redis 2', seriesData)
        return JSON.parse(seriesData)
      } else {
        axios({
          url: 'http://localhost:4002/series',
          method: 'GET'
        })
          .then(({data}) => {
            redis.set('series:data', JSON.stringify(data))
            // console.log(data)
            return data
            // console.log(data)
          })
          .catch(err => {
            console.log(err)
          })
        }  
    } catch (err) {
      console.log(err)
    }
  }
  static async create(req, res) {
    try {
      await redis.del('series:data')
      axios({
        url: 'http://localhost:4002/series',
        method: 'POST',
        data: req.body
      })
        .then(({data}) => {
          res.status(201).json(data)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
        console.log(err)
    }

  }

  static async update(req, res) {
    const id = req.params.id
    try {
      await redis.del('series:data')
      axios({
        url: `http://localhost:4002/series/${id}`,
        method: 'PUT',
        data: req.body
      })
        .then(({data}) => {
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
        })

    } catch (err) {
        console.log(err)
    }

  }

  static async destroy(req, res) {
    const id = req.params.id
    try {
      await redis.del('series:data')
      axios({
        url: `http://localhost:4002/series/${id}`,
        method: 'DELETE'
      })
        .then(({data}) => {
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
        })

    } catch (err) {
        console.log(err)
    }
  }
}

module.exports = { SeriesController }