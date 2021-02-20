if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
  }
const express = require('express')
const { MongoClient } = require('mongodb')
const { connect, getDatabase } = require('./config/mongodb')
const { MovieController } = require('./controllers/movieControllers')
const movieRouter = require('./routes/movieRoutes')
const app = express()
const port = 4001

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.status(200).json('Jalan Movie Server nya')
})

app.use('/movies', movieRouter)

connect().then(async (db) => {
  console.log('mongo connected')
  app.listen(port, () => {
    console.log('movie server listening on port ' + port)
  })
})
