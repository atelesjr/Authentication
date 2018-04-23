const express = require('express')
const http = require('http')
const bodyParser = require('body-parser') 
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

//DB setup - creates auth db.
mongoose.connect('mongodb://localhost/auth');
//mongoose.connect('mongodb://localhost:27017/auth')

// APP setup - middleware
// morgan log framwework - incoming request.
app.use(morgan('combined'))
// parser incoming request to json.
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// server setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)

//nodemon - watches project directory to any changes. 