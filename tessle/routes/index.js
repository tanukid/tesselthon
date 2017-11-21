const router = require('express').Router()
const path = require('path')
const http = require('http')
var request = require('request')
var fs = require('fs')
var detectFaces = require('../../google-face-detector')


module.exports = function (io) {
  router.get('/', function (req, res) {
    res.render('index')
  })

  router.get('/clap', function (req, res) {

  var url ='http://172.16.21.37:8888'
  request(url, {encoding: 'binary'}, (error, response, body) => {
    fs.writeFile('photo.jpg', body, 'binary', () => {
      detectFaces('./photo.jpg', (err, faces) =>{
        if(faces.length > 0) {
          console.log('MEEEEEOOOOWWW')
          io.emit('clap_back')
        }
      })
    })
  })

  })

  router.get('/image', function (req, res) {
    res.set({ 'Content-Type': 'image/jpg' })
    res.sendFile(path.join(__dirname, '../public/cat2.jpg'))
  })
  return router
}

function checkForFace(done) {
  //  http.get({
  //   hostname: '172.16.21.37',
  //   port: 8888,
  //   path: '/'
  // }, (res) => {

  // })

}

// checkForFace()
