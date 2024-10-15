import { createStore } from 'vuex'

export default createStore({
  state: {
    uploadedData: [],
    accessToken: null as string | null,
    userRole: null as string | null,
  },
  mutations: {
    setUploadedData(state, data) {
      state.uploadedData = data
    }
  },
  actions: {
    updateUploadedData({ commit }, data) {
      commit('setUploadedData', data)
    }
  },
  getters: {
    getUploadedData: (state) => state.uploadedData
  },
  setAccessToken(state, token: string) {
    state.accessToken = token
    localStorage.setItem('access_token', token)
  },
  setUserRole(state, role: string) {
    state.userRole = role
    localStorage.setItem('user_role', role)
  },
  loadFromLocalStorage(state) {
    state.accessToken = localStorage.getItem('access_token')
    state.userRole = localStorage.getItem('user_role')
  },
})
