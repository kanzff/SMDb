const { ObjectID } = require('mongodb')
const { getDatabase } = require('../config/mongodb')
const movies= process.env.COLLECTION_NAME

class Movie {
  static find() {
    return getDatabase().collection(movies).find().toArray()
  }

  static findById(movieId) {
    return getDatabase().collection(movies).findOne(
      {"_id": ObjectID(movieId)}
    )
  }

  static create(movie) {
    return getDatabase().collection(movies).insertOne(movie)
  }

  static update(movieId, data) {
    return getDatabase().collection(movies).findOneAndUpdate(
      {"_id": ObjectID(movieId)},
      {$set: data}
    )
  }

  static destroy(movieId) {
    return getDatabase().collection(movies).findOneAndDelete(
      {"_id": ObjectID(movieId)}
    )
  }
}

module.exports = { Movie }