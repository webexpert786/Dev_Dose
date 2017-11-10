// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* global firebase */
// ^ makes lint errors go away - CONFIGis replaced by webpack's Define plugin config : https://webpack.js.org/plugins/define-plugin/

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// Pack styles from npm
import 'font-awesome/css/font-awesome.css'
import 'bulma/bulma.sass'
Vue.config.productionTip = false

// Initialize firebase
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}
firebase.initializeApp(config)

// Immediately init firebase auth to check for current user
store.dispatch('auth/goInit')
store.dispatch('facebook/goInit')

// For dev/debugging
window.store = store
window.router = router

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
