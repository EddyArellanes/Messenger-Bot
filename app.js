'use strict'

const express = require('express')
const app = express()

//Settings
app.set('port', process.env.PORT || 5000)

//express.json now is body-parser module by default
app.use(express.json())
//Routes
app.use('/api/',require('./routes/api'))
//Init Express
app.listen(app.get('port') ,()=> {
    console.log('Server Initialized')
})
