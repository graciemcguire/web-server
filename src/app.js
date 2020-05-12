const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//expres config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// handlebars views set up
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directory
app.use(express.static(publicPath))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather? I hardly know her!',
    name: 'Gracie McGuire'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Gracie McGuire',
    message: 'Hello! This is just a fun little weather app I created to practice learning Node.js and Express.'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Gracie McGuire',
    message: 'Hi! For any questions please check out graciemcguire.com'
  })
})


app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'you must provide an address.'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if(error){
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error){
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found.',
    name: 'Gracie McGuire'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'This page cannot be found.',
    name: 'Gracie McGuire'
  })
})

app.listen(3000, () => {
  console.log('its workingggg');
})
