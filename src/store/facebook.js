// Vuex state for auth
/* global FB */
/* global firebase */
import Vue from 'vue'
const _ = require('lodash')
const Bluebird = require('bluebird')
const subscriptionsCollectionName = 'facebook_page_subscriptions'

const state = {
  ready: false,
  logging_in: false,
  logging_out: false,
  user: null,
  login_error: '',
  loading_pages: false,
  pages: [],
  subscribed_pages: [],
  pages_error: ''
}

const mutations = {
  'facebook/setReady': function (state, payload) {
    state.ready = payload.ready
  },
  'facebook/setUser': function (state, payload) {
    state.user = payload.user
  },
  'facebook/setLoginError': function (state, payload) {
    state.login_error = payload.error
  },
  'facebook/setLoggingIn': function (state, payload) {
    state.logging_in = payload.logging_in
  },
  'facebook/setLoggingOut': function (state, payload) {
    state.logging_out = payload.logging_out
  },
  'facebook/setLoadingPages': function (state, payload) {
    state.loading_pages = payload.loading_pages
  },
  'facebook/setPages': function (state, payload) {
    state.pages = payload.pages
  },
  'facebook/addPage': function (state, payload) {
    var page = _.find(state.pages, { 'id': payload.page.id })
    if (!page) {
      state.pages.push(payload.page)
    }
  },
  'facebook/setSubscribedPages': function (state, payload) {
    state.subscribed_pages = payload.subscribed_pages
  },
  'facebook/addSubscribedPage': function (state, payload) {
    state.subscribed_pages.push(payload.page)
  },
  'facebook/setPagesError': function (state, payload) {
    state.pages_error = payload.error
  },
  'facebook/updatePage': function (state, payload) {
    var page = _.find(state.pages, { 'id': payload.id })
    if (page) {
      _.each(_.keys(payload.updates), (key) => {
        var value = payload.updates[key]
        Vue.set(page, key, value)
      })
    }
  },
  'facebook/addSubscribedPageById': function (state, payload) {
    var page = _.find(state.pages, { 'id': payload.id })
    if (page) {
      state.subscribed_pages.push(page)
    }
  },
  'facebook/removeSubscribedPageById': function (state, payload) {
    state.subscribed_pages = _.filter(state.subscribed_pages, (page) => { return page.id !== payload.id })
  }
}

// Helper functions for managing facebook subscriptions
// Returns a promise that resolves with page access token
const getPageToken = (pageId) => {
  return new Bluebird((resolve, reject) => {
    // Get page_access_token
    FB.api('/' + pageId + '?fields=access_token', {}, (response) => {
      if (response.error) {
        return reject(new Error(response.error.message))
      }
      resolve(response.access_token)
    })
  })
}

// Returns a promise that resolves with /subscribed_apps call result
// action post => create subscription, delete => remove subscription
const manageSubscription = (pageId, pageAccessToken, action) => {
  return new Bluebird((resolve, reject) => {
    window.FB.api(
      '/' + pageId + '/subscribed_apps',
      action,
      {access_token: pageAccessToken},
      (response) => {
        if (response.error) {
          return reject(new Error(response.error.message))
        }
        return resolve(response)
      }
    )
  })
}

const actions = {
  'facebook/goInit': function (context, payload) {
    window.fbAsyncInit = () => {
      console.log('facebook init', process.env.FACEBOOK_APP_ID)
      FB.init({
        appId: process.env.FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10'
      })
      FB.AppEvents.logPageView()
      context.commit('facebook/setReady', {ready: true})
    }

    /*eslint-disable */
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /*eslint-enable */
  },
  'facebook/goLogin': function (context, payload) {
    context.commit('facebook/setLoggingIn', {logging_in: true})
    context.commit('facebook/setLoginError', {error: ''})
    if (window.FB) {
      window.FB.login((response) => {
        if (response.authResponse) {
          FB.api('/me', (response) => {
            context.commit('facebook/setUser', {user: response})
            context.dispatch('facebook/goLoadPages', {})
          })
        } else {
          context.commit('facebook/setLoginError', {error: 'User cancelled login or did not fully authorize.'})
        }
        context.commit('facebook/setLoggingIn', {logging_in: false})
      }, {scope: 'pages_show_list,manage_pages'})
    } else {
      setTimeout(() => {
        context.dispatch('facebook/goLogin', {})
      }, 2000)
    }
  },
  'facebook/goLogout': function (context, payload) {
    context.commit('facebook/setLoggingOut', {logging_out: true})
    window.FB.login((response) => {
      context.commit('facebook/setUser', {user: null})
      context.commit('facebook/setLoggingOut', {logging_out: false})
      context.commit('facebook/setLoginError', {error: ''})
    })
  },
  'facebook/goLoadPages': function (context, payload) {
    const db = firebase.firestore()
    // Get the user's facebook pages - and determine if each page has a subscription or not
    context.commit('facebook/setPages', {pages: []})
    context.commit('facebook/setPagesError', {error: ''})
    context.commit('facebook/setSubscribedPages', {subscribed_pages: []})
    context.commit('facebook/setLoadingPages', {loading_pages: true})
    if (context.state.user) {
      // TODO - add pagination (someone may actually have more than 1000 pages)
      window.FB.api('/' + context.state.user.id + '/accounts?fields=id,name,picture&limit=1000', (response) => {
        _.each(response.data, (page) => {
          // Add state field for Vue to the page object
          page.subscription = null
          page.loading = true
          page.subscribing = false
          page.unsubscribing = false
          page.error = ''
          context.commit('facebook/addPage', {page: page})
          // See if there is a subscripiton for the page
          page.subscription_unsubscribe = db.collection(subscriptionsCollectionName).doc(page.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              // console.log('Found subscription for page ' + page.name, doc.data())
              context.commit('facebook/updatePage', {id: page.id, updates: {subscribed: true, subscription: doc.data()}})
              // Add to subscribed array
              context.commit('facebook/addSubscribedPage', {page: page})
            } else {
              // console.log('No subscription for page ' + page.name)
              context.commit('facebook/updatePage', {id: page.id, updates: {subscribed: false, subscription: null}})
            }
            context.commit('facebook/updatePage', {id: page.id, updates: {loading: false}})
          })
        })
        context.commit('facebook/setLoadingPages', {loading_pages: false})
      })
    } else {
      context.commit('facebook/setLoadingPages', {loading_pages: false})
    }
  },
  // returns a Promise that resolves when the subscripion has been created
  'facebook/goSubscribeToPage': function (context, payload) {
    var scopedPageAccessToken = ''
    var scopedPageId = payload.page.id
    var scopedPageName = payload.page.name
    var scopedSubscription = null
    context.commit('facebook/updatePage', {id: scopedPageId, updates: {subscribing: true, error: ''}})
    return getPageToken(scopedPageId)
    .then((pageAccessToken) => {
      scopedPageAccessToken = pageAccessToken
      return manageSubscription(scopedPageId, pageAccessToken, 'post')
    })
    .then((response) => {
      const db = firebase.firestore()
      scopedSubscription = {
        page_name: scopedPageName,
        page_access_token: scopedPageAccessToken,
        created_by: context.state.user.name,
        created_on: new Date()
      }
      return db.collection(subscriptionsCollectionName).doc(scopedPageId).set(scopedSubscription)
    })
    .then(() => {
      // Doc has been written to firestore with subscription info
      context.commit('facebook/updatePage', {id: scopedPageId, updates: {subscribed: true, subscribing: false, subscription: scopedSubscription, error: ''}})
      context.commit('facebook/addSubscribedPageById', {id: scopedPageId})
    })
    .catch((error) => {
      context.commit('facebook/updatePage', {id: scopedPageId, updates: {subscribed: false, subscribing: false, subscription: null, error: error.message}})
    })
  },
  // returns a Promise that resolves when the subscripion has been removed
  'facebook/goUnsubscribeFromPage': function (context, payload) {
    var scopedPageId = payload.page.id
    context.commit('facebook/updatePage', {id: scopedPageId, updates: {unsubscribing: true, error: ''}})
    return getPageToken(scopedPageId)
    .then((pageAccessToken) => {
      return manageSubscription(scopedPageId, pageAccessToken, 'delete')
    })
    .then((response) => {
      const db = firebase.firestore()
      return db.collection(subscriptionsCollectionName).doc(scopedPageId).delete()
    })
    .then(() => {
      // Doc has been removed from firestore
      context.commit('facebook/updatePage', {id: scopedPageId, updates: {subscribed: false, unsubscribing: false, subscription: null, error: ''}})
      context.commit('facebook/removeSubscribedPageById', {id: scopedPageId})
    })
    .catch((error) => {
      context.commit('facebook/updatePage', {id: scopedPageId, updates: {unsubscribing: false, error: error.message}})
    })
  }
}

export default {
  state,
  mutations,
  actions
}
