import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../services/api"
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    testStatus: null, // The status of the test in TestTree.vue.
    quiz: {}, // array of data
    dataLength: null, // number of questions
    count: 0, // correct answer counter
    testComponent: null,
    resultMark: null,
    token:'',
    qsts : []
  },
  getters: {
    quiz: state => state.quiz
  },
  mutations: {
    addqst (state, qst_answer) {
      qst_answer.token=state.token
      state.qsts.push(qst_answer)
    },
    defineToken (state, token) {
      state.token = token
    },
    changeComponentStatus (state, component) {
      state.testComponent = component
    },
    runTest: (state) => {
      state.testStatus = true
      state.count = 0
    },
    addCount: state => state.count ++,
  },
  actions: {
    playTest: async ({commit, state}) => {
      await Api.customApi("get", "/gettest/"+state.token).then(response => {
        state.quiz  = response.data.data;        
      })
      state.dataLength = state.quiz.qsts.length
      // and run the test
      await commit('runTest')
    },
    endTest: async ({commit, state}) => {
      state.testComponent = 'result'
      state.testStatus = false
      Api.customApiParam("post", "/endtest",{
        score: state.count,
        token: state.token
      })
      await Api.customApiParam("post", "/candidateanswers", state.qsts)       
    }
  }
})
