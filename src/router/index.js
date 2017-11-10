import Vue from 'vue'
import Router from 'vue-router'
import DashboardScreen from '@/components/DashboardScreen'
import LoginScreen from '@/components/LoginScreen'
import ObsTest from '@/components/ObsTest'
import GamesScreen from '@/components/GamesScreen'
import Trivia from '@/components/Trivia'
import CreatGame from '@/components/CreateGame'
import store from '@/store'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'DashboardScreen',
      component: DashboardScreen,
      beforeEnter (to, from, next) {
        // Redirect to login if there is no user
        store.commit('auth/setLoginRedirect', {path: '/'})
        if (!store.state.auth.user) {
          return next('/login')
        }
        next()
      }
    },
    {
      path: '/login',
      name: 'LoginScreen',
      component: LoginScreen
    },
    {
      path: '/obs/test',
      name: 'ObsTest',
      component: ObsTest
    },
    {
      path: '/GamesScreen',
      name: 'GamesScreen',
      component: GamesScreen,
      beforeEnter (to, from, next) {
        // Redirect to login if there is no user
        store.commit('auth/setLoginRedirect', {path: '/'})
        if (!store.state.auth.user) {
          return next('/login')
        }
        next()
      }
    },
    {
      path: '/Trivia',
      name: 'Trivia',
      component: Trivia,
      beforeEnter (to, from, next) {
        // Redirect to login if there is no user
        store.commit('auth/setLoginRedirect', {path: '/'})
        if (!store.state.auth.user) {
          return next('/login')
        }
        next()
      }
    },
    {
      path: '/Create',
      name: 'CreatGame',
      component: CreatGame,
      beforeEnter (to, from, next) {
        // Redirect to login if there is no user
        store.commit('auth/setLoginRedirect', {path: '/'})
        if (!store.state.auth.user) {
          return next('/login')
        }
        next()
      }
    }
  ]
})
