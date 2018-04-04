<template>
  <v-card>
    <v-card-title> Question № &nbsp;{{questNumber}}</v-card-title>
    <v-progress-linear v-model="computedStatusBar"></v-progress-linear>
    <p class="quest">{{askQuestion}}</p>

    <v-radio-group v-model="check" :mandatory="false" v-for="(elem, index) in quiz.qsts[this.n].answers"
      :key="elem.key"
      :index='index'
      class="customAnswers">
        <v-radio :label='elem.description' :value='elem' @click.native='getAnswer'></v-radio>
    </v-radio-group>

    <span class='pa-3' v-show="seenNextQuestion">{{answerFeedback}}</span>
    <br/>
    <transition name="fade_btn" mode='out-in'>
      <v-btn v-if="!seenNextQuestion"
        color='blue'
        :disabled='answerButtonDisableStatus'
        @click.prevent="sendAnswer"
        key='answer'
        class="ml-3"
      >Reply</v-btn>
      <v-btn v-else
        color='green'
        @click="nextQuestion"
        key='next_question'
        class="ml-3"
      >Next question</v-btn>
    </transition>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'test-questions',
  data: () => ({
    askQuestion: null, // the question itself
    seenNextQuestion: false, // visibility of the "Next question" button
    n: 0, // index of the current issue
    src: null,
    answerFeedback: 'Answer accepted',
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
      this.askQuestion = this.quiz.qsts[this.n].description
    },
    sendAnswer () {
      //  the organization of the check for the correctness of the answer + the output of the next question button
      this.getAnswer()
      this.seenNextQuestion = true
      this.inputDisableStatus = false
      this.check = ''
      console.log(this.takeAnswer.istrue)
      // compare with the correct answer
      if (this.takeAnswer.istrue) {
        this.$store.commit('addCount')
      }
      // check for the last question
      if (this.n === this.statusBar /*this.quiz.qsts.length - 1*/) {
        this.$store.dispatch('endTest')
      }
    },
    getAnswer () {  // получаем ответ
      this.takeAnswer = this.check
      this.answerButtonDisableStatus = false // кнопка ответа теперь активна
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

.quest
  font-family: $fontType
  font-weight: 200
  font-size: $fontSize + 9vh
  padding: 10px 10px 0 10px

  @media screen and (max-width: 440px)
    font-size: $fontSize + 2px

.img-resp
  width: 360px
  height:390px

  @media screen and (max-width: 440px)
    width: 200px
    height: 210px

.customAnswers
  padding: 12px
  border-style: ridge
  border-width: 1px
  border-color: $testColor
  opacity: $testOpacity - 0.07

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