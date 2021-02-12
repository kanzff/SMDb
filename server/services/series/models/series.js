const { ObjectID } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Series {
  static find() {
    return getDatabase().collection('series').find().toArray()
  }

  static create(series) {
    return getDatabase().collection('series').insertOne(series)
  }

  static update(seriesId, data) {
    return getDatabase().collection('series').findOneAndUpdate(
      {"_id": ObjectID(seriesId)},
      {$set: data}
    )
  }

  static destroy(seriesId) {
    return getDatabase().collection('series').findOneAndDelete(
      {"_id": ObjectID(seriesId)}
    )
  }
}

module.exports = { Series }