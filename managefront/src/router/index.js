import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import HomePage from '@/components/HomePage'
import TotalReservationPage from '@/components/TotalReservationPage'
import MyAccountPage from '@/components/MyAccountPage'
import ReservableDatePage from '@/components/ReservableDatePage'
import AccountManagePage from '@/components/AccountManagePage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    {
      path: '/reservableDate',
      name: 'ReservableDatePage',
      component: ReservableDatePage
    },
    {
      path: '/accountManage',
      name: 'AccountManagePage',
      component: AccountManagePage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
