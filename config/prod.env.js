'use strict'
var fs = require('fs')
const firebaserc = JSON.parse(fs.readFileSync('./.firebaserc', "utf8"))

// Config for beta (dose-live-development) app
const beta = {
  NODE_ENV: '"production"',
  FIREBASE_API_KEY: '"AIzaSyB5gOOb_G43sWz1DZwl25Oq-rmQg-cOeXA"',
  FIREBASE_AUTH_DOMAIN: '"dose-live-development.firebaseapp.com"',
  FIREBASE_DATABASE_URL: '"https://dose-live-development.firebaseio.com"',
  FIREBASE_PROJECT_ID: '"dose-live-development"',
  FIREBASE_STORAGE_BUCKET: '"dose-live-development.appspot.com"',
  FIREBASE_MESSAGING_SENDER_ID: '"767783060985"',
  FACEBOOK_APP_ID: '"1682093001815072"'
}

// Config for prod (dose-live) app
const prod = {
  NODE_ENV: '"production"',
  FIREBASE_API_KEY: '"AIzaSyBbXX2gEHs-ABNSXBuceSLoNDMzZMIEGIE"',
  FIREBASE_AUTH_DOMAIN: '"dose-live.firebaseapp.com"',
  FIREBASE_DATABASE_URL: '"https://dose-live.firebaseio.com"',
  FIREBASE_PROJECT_ID: '"dose-live"',
  FIREBASE_STORAGE_BUCKET: '"dose-live.appspot.com"',
  FIREBASE_MESSAGING_SENDER_ID: '"646948488844"',
  FACEBOOK_APP_ID: '"327148251093861"'
}

console.log('~~ building for ' + firebaserc.projects.default)
var toExport = beta
if (firebaserc.projects.default === 'dose-live') {
  toExport = prod
}

module.exports = toExport