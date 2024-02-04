import Vue from 'vue'
import Vuex from 'vuex'

import routes from './modules/routes.module'
import loader from './modules/loader.module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loader,
    routes
  }
})
