import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import ThemePage from '@/components/ThemePage'
import ReservationPage from '@/components/ReservationPage'
import NoticePage from '@/components/NoticePage'
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
    },
    {
      path: '/reservation',
      name: 'ReservationPage',
      component: ReservationPage
    },
    {
      path: '/reservation/branch/:branch_id',
      name: 'ReservationPageFromTheme',
      component: ReservationPage
    },
    {
      path: '/notice',
      name: 'NoticePage',
      component: NoticePage
    },
  ]
})
