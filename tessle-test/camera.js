'use strict';
const fs = require('fs');
const os = require('os');
const http = require('http');
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
