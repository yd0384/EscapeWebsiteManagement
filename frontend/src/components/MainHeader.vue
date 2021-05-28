<template>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">
        <img src="https://placekitten.com/g/30/30" alt="Kitten">
        EscapeRoom
      </b-navbar-brand>
      <b-nav-item text="Theme" right>Theme</b-nav-item>
      <b-nav-item-dropdown text="Reservation" right>
        <b-dropdown-item v-for="menu in MenuReservation" :key="menu.id">{{menu.title}}</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Customer" right>
        <b-dropdown-item v-for="menu in MenuCustomer" :key="menu.id">{{menu.title}}</b-dropdown-item>
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
                        title: '예약하기'
                    },
                    {
                        id: 2,
                        title: '예약확인/취소'
                    },
                ],
                MenuCustomer: [
                    {
                        id: 1,
                        title: '공지사항'
                    },
                    {
                        id: 2,
                        title: '매장 안내'
                    },
                    {
                        id: 3,
                        title: '문의 사항'
                    },
                ]
            }
        }
    }
</script>
