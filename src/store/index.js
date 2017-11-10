import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import facebook from './facebook'
import game from './game'

Vue.use(Vuex)

export default new Vuex.Store({modules: {
  auth,
  facebook,
  game
}})
