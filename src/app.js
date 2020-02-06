const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express Config
const publicPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup partials
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Diovane Monteiro Rossato'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Diovane Monteiro Rossato'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Have a nice day',
        title: 'Help',
        name: 'Diovane Monteiro Rossato'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, {latitude, longitude, name:location} = {}) => {
        if (error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            return res.send({
                location,
                forecast: forecastData                
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Diovane Monteiro Rossato'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Diovane Monteiro Rossato'
    })
})

app.listen(3500, () => {
    console.log('Server is up on port 3500 !!')  
})