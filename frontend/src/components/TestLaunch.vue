<template>
  <v-app :dark="dark" app>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      app
      >
      <v-list>
        <v-list-tile
          value="true"
          v-for='item in menuItems'
          :key='item.icon'
          class="cur"
        >
          <v-list-tile-action @click='goTo(item.link)'>
            <v-icon style="color:#E1BEE7" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content class='menu-drawer' @click='goTo(item.link)'>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class='error darken-4' dark flat app>
      <v-btn
        icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title v-text='title' class="cur" @click='goBrand' @click.middle='goBrand'></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y="offset-y">
        <v-btn icon="icon" dark="dark" slot="activator" @click="changetheme()">
          <v-icon dark="dark" v-if="!dark" >brightness_3</v-icon>
          <v-icon dark="dark" v-if="dark" >wb_sunny</v-icon>
        </v-btn>
      </v-menu>
    </v-toolbar>

    <v-content class="app">

      <!-- <Count /> -->

      <transition name="fade" appear mode="out-in">
        <test-tree/>
      </transition>
      
    </v-content>

    <ScrollUp />

    <v-footer v-once>
      <v-spacer></v-spacer>
      <a href='' class="pr-2">© Hidden Founders {{ new Date().getFullYear() }}</a>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import ScrollUp from './ScrollUp'
import Count from './Countdown'
const TestTree = () => import('./TestTree.vue')

export default {
  name: 'app',
  components: {
    Count,
    TestTree,
    ScrollUp
  },
  data: () => ({
    dark: true,
    drawer: false,
    menuItems: [],
    title: 'Your first step to Hidden Founders'
  }),
  methods: {
    changetheme() {
      this.dark=!this.dark
    },
    goBrand () {
      window.location.reload()
    },
    goTo (par) {
      window.open(par)
    }
  },
  mounted() {
    this.$store.commit('defineToken', this.$route.params.token)
  }
}
</script>

<style lang="stylus">
@import '../stylus/main'

[v-cloak] 
  display: none

.app 
  max-width: 1400px
  margin: 40px 300px 40px
  font-size: $fontSize

  @media screen and (max-width: 440px)
    font-size: $fontSize - 2px

.cur
  cursor:pointer

a
  text-decoration: none

/* Local App.vue style */
.menu-drawer
  &:hover
    font-weight: bold

/* _Transition_ */
.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 3s

.fade-leave
  opacity: 1

.fade-leave-active
  transition-duration: 0s
  transition-delay: 0s
</style>
