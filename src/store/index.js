import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courselist: [],

  },
  getters: {
    courselist: state => state.courselist

  },
  mutations: {
    changelist(state, data) {
      console.log(data);
      state.courselist.push(...data)
    },
    changeStatus(state, index) {
      state.courselist[index].status = 'success'
    },
    clearList(state) {
      state.courselist = []
    },
    deletelist(state, index) {
      state.courselist.splice(index, 1)
    }


  },
  actions: {
  },
  modules: {
  }
})
