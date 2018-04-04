<template>
  <v-layout fluid column>

    <v-flex justify-center>
      <transition name="slide-y-transition" appear>
        <!-- start button -->
        <div class="text-xs-center" v-if="btnStartGame">
          <v-btn
            color='blue'
            dark
            @click.prevent='checkTestStatus(testStatus)'
            @click.native="startTest()"
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
import { mapState } from 'vuex'
import TestQuestions from './TestQuestions'
const Result = () => import('./Result.vue')

export default {
  name: 'test-tree',
  components: {
    Result,
    TestQuestions
  },
  data: () => ({
    btnStartGame: true, // button visibility
    btnRunTestStatus: 'Begin the test' // the inscription on the button
  }),
  computed: {
    btnStatus () {
      if (this.testComponent === 'result') {
        this.btnStartGame = true
        this.btnRunTestStatus = 'To main'
      }
      return this.btnRunTestStatus
    },
    ...mapState(['testComponent', 'testStatus'])
  },
  methods: {
    /*
      if the test is not started, then we begin,
      If we return from Result.vue, then proceed to selecting the test for TestHeader.vue
    */
    startTest (index, testName) {
      this.$store.dispatch('playTest')
    },
    checkTestStatus (status) {
      if (status === true) {
        this.btnStartGame = false
        this.$store.commit('changeComponentStatus', 'test-questions')
      } else {
        this.$store.state.showTestHeader = true
      }
    },
    Result () {
      this.btnRunTestStatus = 'To main'
    }
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

