const path = require('path')
const express = require('express')
const app = express()
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))


//get takes in 2 arguments - route and a function

// app.get('/help', (req, res) => {
//   res.send('help page')
// })

// app.get('/about', (req, res) => {
//   res.send({ "page": 'about', "test": 1 })
// })

app.get('/weather', (req, res) =>{
  res.send({
    forecast: 'sunny',
    location: 'nyc'
  })
})

app.listen(3000, () => {
  console.log('its workingggg');
})
