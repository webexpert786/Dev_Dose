'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE_API_KEY: '"AIzaSyB5gOOb_G43sWz1DZwl25Oq-rmQg-cOeXA"',
  FIREBASE_AUTH_DOMAIN: '"dose-live-development.firebaseapp.com"',
  FIREBASE_DATABASE_URL: '"https://dose-live-development.firebaseio.com"',
  FIREBASE_PROJECT_ID: '"dose-live-development"',
  FIREBASE_STORAGE_BUCKET: '"dose-live-development.appspot.com"',
  FIREBASE_MESSAGING_SENDER_ID: '"767783060985"',
  FACEBOOK_APP_ID: '"1626546010749015"'
})
