# dose_live

> A Vue.js project

## Developer Notes

This project uses
Vue : https://vuejs.org/
Vue Router : https://router.vuejs.org/en/ (see /src/router/index.js)
Vuex : https://vuex.vuejs.org/en/ (see /src/store/index.js)
Bulma : https://bulma.io/documentation/overview/start/
Fontawseome : http://fontawesome.io/icons/
Firebase (hosting, cloud firestore, authentication, functions) : https://firebase.google.com/

* Please ensure that there is not a feature in any of these packages before adding a new one.

Authentication is currently being done with email/password.  No registration is available so that we can control who gets access by manually creating accounts in the firebase console.  We will likely be migrating to facebook auth in the future : https://firebase.google.com/docs/auth/web/facebook-login?authuser=3  In the meantime, we will be using the Facebook javascript sdk to access each user's pages.

This project has a strict lint configuration - please do not edit it so that we can keep the code well formatted

Two environments are configured with two different firebase projects (and two different facebook apps), dev and production.  See /config/dev.env.js and /config/prod.env.js



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Run Firebase Locally

```
npm run build
nvm use 6.11.1
firebase serve --only functions,hosting
```
(if you get node-sass errors be sure to remove node_modules and re-run npm install with node 6.11.1)

## Deploy

TODO

## Endpoints (Dev)

Function URL (facebookWebhook): https://us-central1-dose-live-development.cloudfunctions.net/facebookWebhook
Function URL (statusCheck): https://us-central1-dose-live-development.cloudfunctions.net/statusCheck
Project Console: https://console.firebase.google.com/project/dose-live-development/overview
Hosting URL: https://dose-live-development.firebaseapp.com
