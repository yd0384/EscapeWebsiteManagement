import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import HomePage from '@/components/HomePage'
import TotalReservationPage from '@/components/TotalReservationPage'
import MyAccountPage from '@/components/MyAccountPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      components: {
        default: HomePage,
        login: LoginPage
      }
    },
    {
      path: '/totalReservation',
      name: 'TotalReservationPage',
      component: TotalReservationPage
    },
    {
      path: '/myAccount',
      name: 'MyAccountPage',
      component: MyAccountPage
    },
  ]
})
