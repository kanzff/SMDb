const { ObjectID } = require('mongodb')
const { getDatabase } = require('../config/mongodb')
const series = process.env.COLLECTION_NAME

class Series {
  static find() {
    return getDatabase().collection(series).find().toArray()
  }

  static findById(seriesId) {
    return getDatabase().collection(series).findOne(
      {"_id": ObjectID(seriesId)}
    )
  }

  static create(serie) {
    return getDatabase().collection(series).insertOne(serie)
  }

  static update(seriesId, data) {
    return getDatabase().collection(series).findOneAndUpdate(
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