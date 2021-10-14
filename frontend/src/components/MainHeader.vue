<template>
    <b-navbar type="dark" variant="dark">
      <router-link :to="{ name : 'MainPage' }">
        <b-navbar-brand >
            <img src="https://placekitten.com/g/30/30" alt="Kitten">
            EscapeRoom
        </b-navbar-brand>
      </router-link>
      <router-link tag="b-nav-item" :to="{ name : 'ThemePage' }" right>
        Theme
      </router-link>
      <b-nav-item-dropdown text="Reservation" right>
        <router-link tag="b-dropdown-item" :to="{ name : menu.url }" v-for="menu in MenuReservation" :key="menu.id">{{menu.title}}</router-link>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Customer" right>
        <router-link tag="b-dropdown-item" :to="{ name : menu.url }" v-for="menu in MenuCustomer" :key="menu.id">{{menu.title}}</router-link>
      </b-nav-item-dropdown>
    </b-navbar>
</template>

<script>
    export default {
        data() {
            return {
                MenuReservation: [
                    {
                        id: 1,
                        title: '예약하기',
                        url: 'ReservationPage'
                    },
                    {
                        id: 2,
                        title: '예약확인/취소',
                        url: 'ReservationCheckPage'
                    },
                ],
                MenuCustomer: [
                    {
                        id: 1,
                        title: '공지사항',
                        url: 'NoticePage'
                    },
                    {
                        id: 2,
                        title: '매장 안내'
                    },
                ]
            }
        }
    }
</script>
