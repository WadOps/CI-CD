<template>
  <v-app dark app>
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

    <v-toolbar class='grey darken-4' dark flat app>
      <v-btn
        icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title v-text='title' class="cur" @click='goBrand' @click.middle='goBrand'></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-once class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="item in menuItems"
          :key='item.title'
          :href='item.link'
        >{{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content class="app">
      <!-- Place where we choose a test -->
      <transition name="fade" appear mode="out-in">
        <!-- <test-header v-if='showTestHeader' /> -->
        <test-tree />
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
const TestTree = () => import('./components/TestTree.vue')

export default {
  name: 'app',
  components: {
    TestTree,
    ScrollUp
  },
  data: () => ({
    drawer: false,
    menuItems: [
    ],
    title: 'Your first step to Hidden Founders'
  }),
  methods: {
    goBrand () {
      window.location.reload()
    },
    goTo (par) {
      window.open(par)
    }
  }
}
</script>

<style lang="stylus">
@import './stylus/main'

/* html not app styles */
[v-cloak] 
  display: none

/* Global app styles */
.app 
  max-width: 1400px
  margin: 0 auto 40px
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
