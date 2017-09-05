import Vue from 'vue'
import Vuex from 'vuex'

import initialState from '../../library.json'

// import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: initialState,
  actions: {},
  getters,
  modules: {},
  strict: true
})
