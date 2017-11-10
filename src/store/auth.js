// Vuex state for auth
// NOTE : In the future this will be replaced with ./facebook.js : https://firebase.google.com/docs/auth/web/facebook-login?authuser=3
/* global firebase */

const state = {
  user: null,
  error: false,
  logging_in: false,
  logging_out: false,
  project_id: process.env.FIREBASE_PROJECT_ID,
  login_redirect: '/'
}

const mutations = {
  'auth/setUser': function (state, payload) {
    state.user = payload.user
  },
  'auth/setError': function (state, payload) {
    state.error = payload.error
  },
  'auth/setLoggingIn': function (state, payload) {
    state.logging_in = payload.logging_in
  },
  'auth/setLoggingOut': function (state, payload) {
    state.logging_out = payload.logging_out
  },
  'auth/setLoginRedirect': function (state, payload) {
    state.login_redirect = payload.path
  }
}

const actions = {
  'auth/goInit': function (context, payload) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        context.commit('auth/setUser', {user: user})
        context.commit('auth/setLoggingIn', {logging_in: false})
        // Init second phase of login : facebook
        context.dispatch('facebook/goLogin')
      } else {
        // No user is signed in.
        context.commit('auth/setUser', {user: null})
        context.commit('auth/setLoggingOut', {logging_out: false})
        // Seconds phase of logout : facebook
      }
    })
  },
  'auth/goLogin': function (context, payload) {
    context.commit('auth/setError', {error: ''})
    context.commit('auth/setLoggingIn', {logging_in: true})
    context.commit('auth/setLoggingOut', {logging_out: false})
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch((error) => {
      context.commit('auth/setError', {error: error.message})
      context.commit('auth/setLoggingIn', {logging_in: false})
    })
  },
  'auth/goLogout': function (context, payload) {
    context.commit('auth/setLoggingIn', {logging_in: false})
    context.commit('auth/setLoggingOut', {logging_out: true})
    firebase.auth().signOut()
    context.dispatch('facebook/goLogout', {})
  }
}

export default {
  state,
  mutations,
  actions
}
