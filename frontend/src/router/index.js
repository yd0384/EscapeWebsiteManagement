import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import ThemePage from '@/components/ThemePage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/theme',
      name: 'ThemePage',
      component: ThemePage
    }
  ]
})
