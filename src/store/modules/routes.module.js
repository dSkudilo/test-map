import { sendReq } from '@/services/routesAndstops'

export default {
  namespaced: true,
  state () {
    return {
      routes: []
    }
  },
  mutations: {
    setRoutes (state, value) {
      state.routes = value
    }
  },

  actions: {
    async getRoutes ({ commit }) {
      const { data } = await sendReq()
      // определяю для каждой стоянки кол-во маршрутов
      // собираю все уникальные
      // исхожу из того что в 1 маршруте повторяются остановки
      const hash = {}
      data.forEach((e, id) => {
        e.Stops.forEach((stop, stopId) => {
          if (!hash[stop.ID]) {
            hash[stop.ID] = [e.ID]
          } else if (!hash[stop.ID].includes(e.ID)) {
            hash[stop.ID].push(e.ID)
          }

          if (!stop.routesId) {
            // передаю ссылку преднамеренно чтобы не пробегаться после подсчета по массивам еще раз
            // понимаю что после этого будут мутации но это экономит время выполнения
            data[id].Stops[stopId].routesId = hash[stop.ID]
          }
        })
      })
      commit('setRoutes', data)
    }
  },

  getters: {
    routes: (state) => {
      return state.routes || []
    },
    route: (state) => (id) => {
      return state.routes.find(e => e.ID === id)
    }
  }

}
