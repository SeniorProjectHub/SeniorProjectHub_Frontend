import { createStore } from 'vuex';

export default createStore({
  state: {
    uploadedData: []
  },
  mutations: {
    setUploadedData(state, data) {
      state.uploadedData = data;
    }
  },
  actions: {
    updateUploadedData({ commit }, data) {
      commit('setUploadedData', data);
    }
  },
  getters: {
    getUploadedData: (state) => state.uploadedData
  }
});
