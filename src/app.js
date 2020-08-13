const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars (hbs) engine and view locations
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory location
app.use(express.static(publicDirPath))

// GET requests
app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Mukul Bindal'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        contact : Math.random(1000001)*10000000,
        title : 'Help'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        name : 'Mukul Bindal',
        quote : 'Even numbers are divided by 10 in binary.',
        title : 'About'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
                error : "An address must be provided!"
            }
        )
    }
    var address = req.query.address
    forecast(address, (error,response) => {
        if(error) {
            return res.send({
                error 
            })
        }

        res.send({
            address : req.query.address,
            forecast: response
        })
    })
    
})

app.get('*', (req,res)=> {
    res.render('404',{
        title:'404 Page not Found 🐷'
    })
})
app.listen(port, () => {
    console.log("Server is up!")
})