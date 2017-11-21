'use strict'
var express = require('express')
var app = express()
var morgan = require('morgan')
var nunjucks = require('nunjucks')
var router = require('./routes')
var path = require('path')
var bodyParser = require('body-parser')
var socketio = require('socket.io')

// templating boilerplate setup
app.engine('html', nunjucks.render) // how to render html templates
app.set('view engine', 'html') // what file extension do our templates have
nunjucks.configure('views', { noCache: true }) // where to find the views, caching off

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })) // for HTML form submits
app.use(bodyParser.json()) // would be for AJAX requests
app.use(express.static(path.join(__dirname, '/public')))

function startServer(done) {
  var server = app.listen(3000, function () {
    console.log('listening on port 3000')
    var io = socketio.listen(server)
    app.use('/', router(io))
    if (done) done(app, io)
  })
}

module.exports = { startServer }
