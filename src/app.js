const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
    title: 'Weather',
    name: 'Gracie McGuire'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Gracie McGuire'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Gracie McGuire',
    message: 'hi how can i help u'
  })
})


app.get('/weather', (req, res) =>{
  res.send({
    forecast: 'sunny',
    location: 'nyc'
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
