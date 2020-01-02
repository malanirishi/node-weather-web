const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather application served on hbs page',
        name: 'Rishi Malani'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page for Weather app',
        name: 'Rishi Malani',
        helpText: 'This is help text',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page for Weather application',
        name: 'Rishi Malani'
    });
});

app.get('/weather', (req, res) => {
    console.log(req.query);
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address,
            });
        })
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    res.send({
        products: [],
    });
})

app.get('/help/*', (req, res) => {
    res.render('page404', {
        title: '404',
        name: 'Rishi Malani',
        text404: 'Help article not found',
    });
});

app.get('*', (req, res) => {
    res.render('page404', {
        title: '404',
        name: 'Rishi Malani',
        text404: 'Page not found',
    });
});

app.listen(3000, () => {
    console.log('Server has started!!');
});
