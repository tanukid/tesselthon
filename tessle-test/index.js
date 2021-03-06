var tessel = require('tessel')
var ambientlib = require('ambient-attx4')
var ambient = ambientlib.use(tessel.port['A'])
var http = require('http')

function startAmbientSensor(done) {
  var maxClaps = 5
  var claps = 0

  ambient.on('ready', function () {
    ambient.setSoundTrigger(0.20)
    ambient.once('sound-trigger', soundTrigger)
    console.log('Clap detection ready')
    if (done) done()
  })

  /*
    Sound sensor event handlers
  */
  function soundTrigger() {
    console.log('Clap detected', claps)
    ++claps
    // To create pauses for claps. Constant sounds can't work
    // TEST: Does this work?
    stopListening()

    if (claps >= maxClaps) {
      triggerClapResponse(startListening)
      claps = 0
    }
  }

  function startListening() {
    console.log('Started Listening', claps)
    ambient.once('sound-trigger', soundTrigger)
    ambient.setSoundTrigger(0.17)
  }

  function stopListening() {
    console.log('Stopped listening', claps)
    ambient.clearSoundTrigger(() => setTimeout(startListening, 1))
  }

  function triggerClapResponse(done) {
    http.get({
    hostname: '172.16.21.90',
    port: 3000,
    path: '/clap'
  }, done)
  }
}

module.exports = startAmbientSensor

startAmbientSensor()


const fs = require('fs');
const os = require('os');
const port = 8888;

const av = require('tessel-av');
const camera = new av.Camera({
  width: 320,
  height: 240,
});

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "image/jpg" });

  camera.capture().pipe(response);

}).listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));

process.on("SIGINT", _ => server.close());
