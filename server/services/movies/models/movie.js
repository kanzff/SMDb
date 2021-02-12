const { ObjectID } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Movie {
  static find() {
    return getDatabase().collection('movies').find().toArray()
  }

  static create(movie) {
    return getDatabase().collection('movies').insertOne(movie)
  }

  static update(movieId, data) {
    return getDatabase().collection('movies').findOneAndUpdate(
      {"_id": ObjectID(movieId)},
      {$set: data}
    )
  }

  static destroy(movieId) {
    return getDatabase().collection('movies').findOneAndDelete(
      {"_id": ObjectID(movieId)}
    )
  }
}

module.exports = { Movie }