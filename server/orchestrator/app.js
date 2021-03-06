const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
// const Redis = require('ioredis')
// const redis = new Redis()

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    getMovies: [Movie]
    getSeries: [Series]
    getMovie(_id: ID): Movie
    getOneSeries(_id: ID): Series
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieUpdate {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Mutation {
    addMovie(data: MovieInput): Movie
    updateMovie(data: MovieUpdate): Movie
    destroyMovie(_id: ID): Movie
  }
`

const resolvers = {
  Query: {
    getMovies: async () => {
      // const movieData = await redis.get('movies:data')
      // if (movieData) {
      //   // console.log('dari redis', movieData)
      //   return JSON.parse(movieData)
      // } else {
        return axios({
          url: 'https://entertainme-service-movie.herokuapp.com/movies',
          method: 'GET'
        })
          .then(({data}) => {
            // console.log('bukan dari redis')
            // redis.set('movies:data', JSON.stringify(data))
            return data
          })
          .catch(err => {
            console.log(err)
          })
      // }
    },
    getMovie: (parent, args, context, info) => {
      const { _id } = args
      return axios({
        url: `https://entertainme-service-movie.herokuapp.com/movies/${_id}`,
        method: 'GET'
      })
        .then(({data}) => {
          // console.log('bukan dari redis')
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSeries: async () => {
      // const seriesData = await redis.get('series:data')
      // if (seriesData) {
      //   // console.log('dari redis', movieData)
      //   return JSON.parse(seriesData)
      // } else {
        return axios({
          url: 'https://entertainme-service-series.herokuapp.com/series',
          method: 'GET'
        })
          .then(({data}) => {
            // console.log('bukan dari redis')
            // redis.set('series:data', JSON.stringify(data))
            return data
          })
          .catch(err => {
            console.log(err)
          })
      // }
    },
    getOneSeries: (parent, args, context, info) => {
      const { _id } = args
      return axios({
        url: `https://entertainme-service-series.herokuapp.com/series/${_id}`,
        method: 'GET'
      })
        .then(({data}) => {
          // console.log('bukan dari redis')
          return data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  Mutation: {
    addMovie: async (parent, args, context, info) => {
      const { title, overview, poster_path, popularity, tags } = args.data
      // await redis.del('movies:data')

      return axios({
        url: 'https://entertainme-service-movie.herokuapp.com/movies',
        method: 'POST',
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })
        .then(({data}) => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateMovie: async (parent, args, context, info) => {
      const { _id, title, overview, poster_path, popularity, tags } = args.data
      // await redis.del('movies:data')

      return axios({
        url: `https://entertainme-service-movie.herokuapp.com/movies/${_id}`,
        method: 'PUT',
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })
        .then(({data}) => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },
    destroyMovie: async (parent, args, context, info) => {
      const { _id } = args
      // await redis.del('movies:data')

      return axios({
        url: `https://entertainme-service-movie.herokuapp.com/movies/${_id}`,
        method: 'DELETE'
      })
        .then(({data}) => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  introspection: true,
  playground: true, 
})

server.listen({ port: process.env.PORT || 4000 }).then(({url}) => {
  console.log('server ready at ' + url)
})