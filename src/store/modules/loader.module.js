export default {
  namespaced: true,
  state () {
    return {
      isLoading: false
    }
  },
  mutations: {
    setLoading (state, value) {
      state.isLoading = value
    }
  },

  actions: {
    setLoading ({ commit }, value) {
      commit('setLoading', value)
    }
  },

  getters: {
    isLoading: (state) => {
      return state.isLoading
    }
  }

}
