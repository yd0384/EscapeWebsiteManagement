import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/components/LoginPage'
import Home from '@/components/Home'
import TotalReservation from '@/components/TotalReservation'
import MyAccountPage from '@/components/MyAccountPage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/totalReservation',
      name: 'TotalReservation',
      component: TotalReservation
    },
    {
      path: '/MyAccount',
      name: 'MyAccountPage',
      component: MyAccountPage
    },
  ]
})
