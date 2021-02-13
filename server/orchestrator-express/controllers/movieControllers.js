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
}

module.exports = { MovieController }