// server.js
const serveStatic = require('serve-static');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const path = require('path')


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//Serve the Vue server
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port);