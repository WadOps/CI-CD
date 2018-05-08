<template>
  <v-card>
    <v-card-title> Question №{{questNumber}}</v-card-title>
    <v-progress-linear v-model="computedStatusBar"></v-progress-linear>
    <v-card-text><p v-html="askQuestion"></p></v-card-text>

    <v-divider></v-divider>
    <v-radio-group v-model="check" :mandatory="false" v-for="(elem, index) in quiz.qsts[this.n].answers"
      :key="elem.key"
      :index='index'
      class="px-3"
    >
        <v-radio :label='elem.desc' :value='elem' @click.native='getAnswer' :disabled="!inputDisableStatus"></v-radio>
    </v-radio-group>

    <span class='pa-3' v-show="seenNextQuestion">{{answerFeedback}}</span>
    <br/>
    <transition name="fade_btn" mode='out-in'>
      <v-btn v-if="!seenNextQuestion"
        color='blue'
        :disabled='answerButtonDisableStatus'
        @click.prevent="sendAnswer"
        key='answer'
        class="ml-3 px-3 mb-3"
      >Reply</v-btn>
      <v-btn v-else
        color='green'
        @click="nextQuestion"
        key='next_question'
        class="ml-3 px-3 mb-3"
      >Next question</v-btn>
    </transition>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
var marked = require('marked')

export default {
  name: 'test-questions',
  data: () => ({
    askQuestion: null, // the question
    seenNextQuestion: false, // visibility of the "Next question" button
    n: 0, // index of the current issue
    src: null,
    answerFeedback: 'Ready for the next question',
    statusBar: Number,
    check: {}, // choice of answer
    answerButtonDisableStatus: true, // the answer button is turned off if no option is selected
    inputDisableStatus: true  // disabling radio interference / responses
  }),
  computed: {
    questNumber () {
      return this.n + 1
    },
    computedStatusBar () {
      return this.n / this.statusBar * 100
    },
    ...mapGetters(['quiz']),
    ...mapState(['dataLength'])
  },
  mounted () {
    this.n = 0
    this.statusBar = this.dataLength - 1
    this.askIt()
  },
  methods: {
    askIt () {
      // asking questions
      this.seenNextQuestion = false
      this.askQuestion = marked(this.quiz.qsts[this.n].desc)
    },
    sendAnswer () {
      this.$store.commit('addqst', {idqst : this.quiz.qsts[this.n].id, idanswer : this.check.id})
      this.getAnswer()
      this.seenNextQuestion = true
      this.inputDisableStatus = false
      this.check = ''
      // compare with the correct answer
      if (this.takeAnswer.istrue) {
        this.$store.commit('addCount')
      }
      // check for the last question
      if (this.n === this.statusBar) {
        this.$store.dispatch('endTest')
      }
    },
    getAnswer () {  
      this.takeAnswer = this.check
      this.answerButtonDisableStatus = false 
    },
    nextQuestion () {
      this.answerButtonDisableStatus = true
      this.inputDisableStatus = !this.inputDisableStatus
      this.n += 1
      this.askIt()
    }
  },
  beforeDestroy () {
    this.n = null
    this.src = null
    this.statusBar = null
  }
}
</script>

<style lang='stylus'>
@import '../stylus/main'


  @media screen and (max-width: 440px)
    font-size: $fontSize + 2px

  @media screen and (max-width: 440px)
    width: 200px
    height: 210px

.radio

  &:hover
    opacity: 1

  &__label:hover
    cursor: pointer
    opacity: 1

.fade_btn-enter-active
  transition: opacity .4s

.fade_btn-leave-active
  transition: opacity .4s
  opacity: 0
</style>