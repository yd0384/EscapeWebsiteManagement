<template>
    <div>
        <b-navbar type="light" variant="faded" style="list-style-type:none; height:100px;">
            <router-link :to="{ name : 'HomePage' }">
                <b-navbar-brand >
                    <h1 style="margin-top:-10px;">EscapeRoom</h1>
                </b-navbar-brand>
            </router-link>
            <b-nav-item-dropdown text="예약 관리" right>
                <router-link tag="b-dropdown-item" :to="{ name : menu.url }" v-for="menu in MenuReservation" :key="menu.id">{{menu.title}}</router-link>
            </b-nav-item-dropdown>
            <h3>{{user.name}}님 환영합니다.</h3>
            <b-button variant="info" @click="myAccount"><b-icon icon="person-fill" aria-hidden="true"></b-icon>내 정보</b-button>
            <b-button variant="outline-info" @click="logout"><b-icon icon="power" aria-hidden="true"></b-icon>로그아웃</b-button>
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
                        title: '전체 예약',
                        url: 'TotalReservationPage'
                    },
                    {
                        id: 2,
                        title: '당일 예약',
                        url: 'TotalReservationPage'
                    },
                    {
                        id: 3,
                        title: '취소된 예약',
                        url: 'TotalReservationPage'
                    },
                    {
                        id: 4,
                        title: '예약가능 일수',
                        url: 'TotalReservationPage'
                    },
                    {
                        id: 5,
                        title: '노쇼 리스트',
                        url: 'TotalReservationPage'
                    },
                ]
            }
        },
        created(){
            this.$http.get("/api/auth/login")
            .then((res)=>{
                const user = res.data.user;
                if (user) {
                    this.$store.commit("setUser", user);
                }
                else {
                    this.$router.go();
                }
            })
            .catch((err)=>{
                console.error(err);
            });
        },
        computed: {
            user() { return this.$store.getters.user; }
        },
        methods: {
            logout(){
                this.$http.get('/api/auth/logout')
                .then(()=>{
                    this.$store.commit("setUser", null);
                    this.$router.push({ name: 'HomePage' },this.$router.go());
                })
                .catch((err)=>{
                    console.error(err);
                })
            },
            myAccount(){
                this.$router.push({name: "MyAccountPage"});
            }
        }
    }
</script>
