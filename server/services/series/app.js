if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const { MongoClient } = require('mongodb')
const { connect, getDatabase } = require('./config/mongodb')
const seriesRouter = require('./routes/seriesRoutes')
const app = express()
const port = process.env.PORT || 4002

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.status(200).json('Jalan Series Server nya')
})

app.use('/series', seriesRouter)

connect().then(async (db) => {
  console.log('mongo connected')
  app.listen(port, () => {
    console.log('series server listening on port ' + port)
  })
})
