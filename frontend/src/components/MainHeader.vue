<template>
    <div>
        <b-navbar type="light" variant="faded" style="list-style-type:none; height:100px;">
        <router-link :to="{ name : 'MainPage' }">
            <b-navbar-brand >
                <img src="https://vistapointe.net/images/key-6.jpg" alt="Kitten" style="height:50px;">
                <h1 style="margin-top:-10px;">EscapeRoom</h1>
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
        <hr>
    </div>
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
