import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../services/api";

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    testStatus: null, // The status of the test in TestTree.vue.
    quiz: {}, // array of data
    dataLength: null, // number of questions
    count: 0, // correct answer counter
    testComponent: null,
    resultMark: null
  },
  getters: {
    quiz: state => state.quiz
  },
  mutations: {
    changeComponentStatus (state, component) {
      state.testComponent = component
    },
    runTest: (state) => {
      state.showTestHeader = false
      state.testStatus = true
      state.count = 0
    },
    addCount: state => state.count ++,
    showResults (state) {
      state.testStatus = false
    }
  },
  actions: {
    playTest: async ({commit, state}) => {
      await Api.customApi("get", "/gettest/5abbaff1308cb05c26032079").then(response => {
        state.quiz  = response.data.data;        
      })
      state.dataLength = state.quiz.qsts.length
      /* and run the test next */
      commit('runTest')
    },
    endTest: async ({commit, state}) => {
      if (state.count <= (Math.floor(state.dataLength * 0.4))) {
        // плохой рез-т
        state.resultMark = 'fail'
      } else if (state.count > (Math.floor(state.dataLength * 0.85))) {
        // отличный рез-т
        state.resultMark = 'success'
      } else {
        // средний рез-т
        state.resultMark = 'middle'
      }
      state.testComponent = 'result'
      // eslint-disable-next-line
      let results = await commit('showResults')
      results = null
    }
  }
})
