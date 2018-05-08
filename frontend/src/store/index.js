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
    passedTestId: '',
    token:'',
    qsts : [],
    starttime : null,
    counting: false
  },
  getters: {
    quiz: state => state.quiz
  },
  mutations: {
    setcounter (state) {
      state.counting=!state.counting
    },
    setstarttime (state) {
      state.starttime = Date.now()
    },
    addqst (state, qst_answer) {
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
    beginTest: async ({commit, state}) => {
      await Api.customApiParam("post", "/createpassed",{
        starttime: state.starttime,
        token: state.token
      }).then(response => { state.passedTestId = response.data.data })
      await commit('setcounter')
    },
    playTest: async ({commit, state}) => {
      await Api.customApi("get", "/gettest/"+state.token).then(response => {
        if(response.data.success == "expired")
          commit ('changeComponentStatus','result')
        else {
          state.quiz  = response.data.data
          state.dataLength = state.quiz.qsts.length
          // and run the test
          commit('runTest')     
        }
      })
    },
    endTest: async ({commit, state}) => {
      state.testComponent = 'result'
      state.testStatus = false
      await commit('setcounter')
      await Api.customApiParam("post", "/candidateanswers", {
        id: state.passedTestId,
        score: state.count,
        qsts: state.qsts
      })       
    }
  }
})
