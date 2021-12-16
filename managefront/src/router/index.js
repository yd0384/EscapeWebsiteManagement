import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import HomePage from '@/components/HomePage'
import TotalReservationPage from '@/components/TotalReservationPage'
import TodayReservationPage from '@/components/TodayReservationPage'
import MyAccountPage from '@/components/MyAccountPage'
import ReservableDatePage from '@/components/ReservableDatePage'
import AccountManagePage from '@/components/AccountManagePage'
import ReservationDetailPage from '@/components/ReservationDetailPage'
import AccountCreatePage from '@/components/AccountCreatePage'
import CanceledReservationPage from '@/components/CanceledReservationPage'
import ThemeManagePage from '@/components/ThemeManagePage'
import ThemeCreatePage from '@/components/ThemeCreatePage'
import ThemeDetailPage from '@/components/ThemeDetailPage'
import NewReservationPage from '@/components/NewReservationPage'
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
      path: '/todayReservation',
      name: 'TodayReservationPage',
      component: TodayReservationPage
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
      path: '/reservationDetail',
      name: 'ReservationDetailPage',
      component: ReservationDetailPage
    },
    {
      path: '/accountCreate',
      name: 'AccountCreatePage',
      component: AccountCreatePage
    },
    {
      path: '/canceledReservation',
      name: 'CanceledReservationPage',
      component: CanceledReservationPage
    },
    {
      path: '/themeManage',
      name: 'ThemeManagePage',
      component: ThemeManagePage
    },
    {
      path: '/themeCreate',
      name: 'ThemeCreatePage',
      component: ThemeCreatePage
    },
    {
      path: '/themeDetail',
      name: 'ThemeDetailPage',
      component: ThemeDetailPage
    },
    {
      path: '/newReservation',
      name: 'NewReservationPage',
      component: NewReservationPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
