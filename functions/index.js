const functions = require('firebase-functions')
const admin = require('firebase-admin')

// Get the service keys at https://console.firebase.google.com/u/3/project/<PROJECT>/settings/serviceaccounts/adminsdk

// dev
var serviceAccountPath = './dose-live-development-firebase-adminsdk-u28bs-a87cd113ec.json'
if (functions.config().firebase.projectId === 'dose-live') {
  serviceAccountPath = './dose-live-firebase-adminsdk-dyv6d-1dd56da042.json'  // production
}
var serviceAccount = require(serviceAccountPath)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dose-live-development.firebaseio.com'
})

const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.statusCheck = functions.https.onRequest((request, response) => {
  response.send('I am ' + serviceAccount.project_id)
})

exports.facebookWebhook = functions.https.onRequest((request, response) => {
  // if this is a GET, facebook is verifying the webhook
  if (request.method === 'GET') {
    if (request.query['hub.verify_token'] === 'dose_live_vfy') {
      console.log('~~ Verification token matched!')
      return response.send(request.query['hub.challenge'])
    } else {
      console.log('~~ Verification token DID NOT match!')
      return response.status(400).send('Bad Verify Token')
    }
  } else {
    db.collection('webhook_test').add({
      timestamp: new Date().getTime(),
      body: request.body
    })
    .then(ref => {
      console.log('Added document with ID: ', ref.id)
      return response.send('Thanks Facebook!')
    })
  }
})
