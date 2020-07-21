import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    download:0,zhannei:0
  },
  mutations: {
    adddown(state){
      state.download++
      localStorage.setItem('download',state.download)
    },
    zhanneiadddown(state){
      state.zhannei++
      localStorage.setItem('zhannei',state.zhannei)
    },
    addup(state){
      state.download=0
      localStorage.setItem('download',state.download)
    },
    zhanneiaddup(state){
      state.zhannei=0
      localStorage.setItem('zhannei',state.zhannei)
    },
  },
  actions: {
  },
  modules: {
  }
})
