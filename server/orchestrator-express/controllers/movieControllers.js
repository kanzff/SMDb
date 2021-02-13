const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class MovieController {
  static async findMovies() {
    try {
      const movieData = await redis.get('movies:data')
      if (movieData) {
        // console.log('dari redis', movieData)
        return JSON.parse(movieData)
      } else {
        axios({
          url: 'http://localhost:4001/movies',
          method: 'GET'
        })
          .then(({data}) => {
            redis.set('movies:data', JSON.stringify(data))
            // console.log('dari axios', data)
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
      await redis.del('movies:data')
      axios({
        url: 'http://localhost:4001/movies',
        method: 'POST',
        data: req.body
      })
        .then(({data}) => {
          res.status(201).json(data)
        })
        .catch(err => {
          console.log(err)
        })

    } catch(err) {
      console.log(err)
    }

  }

  static async update(req, res) {
    const id = req.params.id
    try {
      await redis.del('movies:data')
      axios({
        url: `http://localhost:4001/movies/${id}`,
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
      await redis.del('movies:data')
      axios({
        url: `http://localhost:4001/movies/${id}`,
        method: 'DELETE'
      })
        .then(({data}) => {
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
        })

    } catch(err) {
        console.log(err)
    }
  }
}

module.exports = { MovieController }