import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/TestLaunch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:token', component: Test
    }
  ]
})
