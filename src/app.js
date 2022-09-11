const path = require('path')
const express = require('express')
const hbs = require('hbs')
// gecode forecast
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebard engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', { title: 'weather app', name: 'Peter' })
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About me', name: 'Peter Aidan' })
})
app.get('/help', (req, res) => {
    res.render('help', { message: 'how may i be of help?', title: 'Help', name: 'Patre Aidan' })
})
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide a search term, address'
        })
    }
    geocode(address, (error, data) => {
        if (data) {
            forecast(data, (error, { location, current }) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    location: location.name,
                    country: location.country,
                    weather_descriptions: current['weather_descriptions'][0],
                    temperature: `${current.temperature} degrees`
                })
            })
        } else {
            return res.send({
                error
            })
        }
    })




})
app.get('/products', (req, res) => {
    res.send('ok sent')
})
app.get('/help/*', (req, res) => {
    res.render('404', { message: 'Something went Wrong!! Help article not found.', name: 'Padre' })
})
// need to come last very neccessary
app.get('*', (req, res) => {
    res.render('404', {
        message: `Something went Wrong!!
    Page not Found`, name: 'Padre '
    })

})
app.listen(3000, () => {
    console.log('server started on port 3000')
})