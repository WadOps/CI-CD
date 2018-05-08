<template>
  <v-layout fluid column>

    <v-flex justify-center>
      <v-snackbar
        :timeout="timeout"
        :top="x"

        color="grey darken-2"
        v-model="counting"
      >
        <v-layout align-center>
          <Count :time="quiz.time"/>
        </v-layout>
      </v-snackbar>
      <transition name="slide-y-transition" appear>
        <!-- start button -->
        <div class="text-xs-center" v-if="startTest()">
          <v-btn
            color='blue'
            dark
            @click.prevent.native='checkTestStatus(testStatus)'            
          >{{btnRunTestStatus}}
          </v-btn>
        </div>
      </transition>

      <transition name="scale-transition" mode="out-in">
        <component :is="testComponent" :btnStatus='btnStatus'></component>
      </transition>

    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TestQuestions from './TestQuestions'
import Count from './Countdown'
import Api from "../services/api"
const Result = () => import('./Result.vue')

export default {
  name: 'test-tree',
  components: {
    Count,
    Result,
    TestQuestions
  },
  data: () => ({
    btnStartGame: true, // button visibility
    btnRunTestStatus: 'Begin the test', // the inscription on the button
    timeout: 0,
    x: true
  }),
  computed: {
    ...mapGetters(['quiz']),

    btnStatus () {
      return this.btnRunTestStatus
    },
    ...mapState(['testComponent', 'testStatus']),
    ...mapState({
      counting: state => state.counting
    })
  },
  methods: {
    /*
      if the test is not started, then we begin,
      If we return from Result.vue, then proceed to selecting the test for TestHeader.vue
    */
    checkTestStatus (status) {
      this.timeout = this.quiz.time*60*1000
      this.$store.commit('setstarttime')
      if (status === true) {
        this.btnStartGame = false
        this.$store.commit('changeComponentStatus', 'test-questions')
      }
      this.$store.dispatch('beginTest')
    },
    startTest () {
      if(this.testComponent == "result") {
        this.btnStartGame = false
        return this.btnStartGame
      } else {
        return this.btnStartGame
      }
    }
  },
  mounted() {
    Api.customApiParam("get", "/checkpassed/"+this.$route.params.token).then(response => {
      if(response.data.data == undefined) {
        this.$store.dispatch('playTest')
      } else {
        this.btnStartGame=false
        this.$store.commit('changeComponentStatus', 'result')       
      } 
    })
  },
  beforeDestroy () {
    this.btnStartGame = null
    this.btnRunTestStatus = null
    this.$store.commit('changeComponentStatus', null)
  }
}
</script>

<style lang='stylus'>
@import '../stylus/main'

.test-name
  font-size $fontSize + 14vh
  font-family $fontType
  color $testColor
  opacity $testOpacity
  padding 16px
  margin 0 auto

  @media screen and (max-width: 440px)
    font-size $fontSize + 4px
    padding 12px
</style>

