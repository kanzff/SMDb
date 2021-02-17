const { mongoclient, MongoClient } = require('mongodb')

let database = null

async function connect() {
  try {
    const uri = 'mongodb://localhost:27017'
    const client = new MongoClient(uri, { useUnifiedTopology: true})

    await client.connect()

    const db = client.db(process.env.DATABASE_NAME)

    database = db

    return database

  } catch (err) {
    console.log(err)
  }
}

function getDatabase() {
  return database
}

module.exports = {
  getDatabase,
  connect
}