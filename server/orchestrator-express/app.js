const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.status(200).json('Jalan App nya')
})

app.listen(port, () => {
  console.log('app listening on port ' + port)
})