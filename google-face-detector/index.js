// https://cloud.google.com/vision/docs/face-tutorial

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GCLOUD_PROJECT environment variable. See
// https://googlecloudplatform.github.io/gcloud-node/#/docs/google-cloud/latest/guides/authentication
var Vision = require('@google-cloud/vision')

// Instantiate a vision client
var vision = Vision({
  projectId: 'tesselathon',
  keyFilename: './credentials.json'
})

function detectFaces(inputFile, callback) {
  // Make a call to the Vision API to detect the faces
  const request = { source: { filename: inputFile } }
  vision.faceDetection(request)
    .then((results) => {
      const faces = results[0].faceAnnotations
      var numFaces = faces.length
      console.log('Found ' + numFaces + (numFaces === 1 ? ' face' : ' faces'))
      if (callback) callback(null, faces)
    })
    .catch((err) => {
      console.error('ERROR:', err)
      if (callback) callback(err)
    })
}

module.exports = detectFaces
