import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import ThemePage from '@/components/ThemePage'
import ReservationPage from '@/components/ReservationPage'
import ReservationCheckPage from '@/components/ReservationCheckPage'
import BookingPage from '@/components/BookingPage'
import NoticePage from '@/components/NoticePage'
import ReservationCompletePage from '@/components/ReservationCompletePage'
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
      path: '/booking',
      name: 'BookingPage',
      component: BookingPage,        
    },
    {
      path: '/complete',
      name: 'ReservationCompletePage',
      component: ReservationCompletePage
    },
    {
      path: '/reservationcheck',
      name: 'ReservationCheckPage',
      component: ReservationCheckPage
    },
    {
      path: '/notice',
      name: 'NoticePage',
      component: NoticePage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
