<template>
    <div>
        <b-navbar type="light" variant="faded" style="list-style-type:none; height:30px;">
            <b-row align-h="start" style="width:100%;">
                <b-col>
                    <router-link :to="{ path: '/' }">
                        <b-navbar-brand >
                            <h1 style="margin-top:-10px;">EscapeRoom</h1>
                        </b-navbar-brand>
                    </router-link>
                </b-col>
                <b-nav-item-dropdown text="예약 관리" v-if="user.level===1 || user.level===2" >
                    <router-link tag="b-dropdown-item" :to="{ name : menu.url }" v-for="menu in MenuReservation" :key="menu.id">{{menu.title}}</router-link>
                </b-nav-item-dropdown>
                <router-link tag="b-nav-item" :to="{ name : 'AccountManagePage' }" v-if="user.level===2" >
                    계정 관리
                </router-link>
                <router-link tag="b-nav-item" :to="{ name : 'ThemeManagePage' }" v-if="user.level===2" >
                    테마 관리
                </router-link>
                <b-col offset-md="4"><h3>{{user.name}}님 환영합니다.</h3></b-col>
                <b-col>
                    <b-button style="margin-right:10px;" variant="info" @click="myAccount"><b-icon icon="person-fill" aria-hidden="true"></b-icon>내 정보</b-button>
                    <b-button variant="outline-info" @click="logout"><b-icon icon="power" aria-hidden="true"></b-icon>로그아웃</b-button>
                </b-col>
            </b-row>
        </b-navbar>
        <hr>
    </div>
</template>

<script>
import { mapState } from 'vuex';
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
                        url: 'TodayReservationPage'
                    },
                    {
                        id: 3,
                        title: '취소된 예약',
                        url: 'CanceledReservationPage'
                    },
                    {
                        id: 4,
                        title: '예약가능 일수',
                        url: 'ReservableDatePage'
                    },
                    {
                        id: 5,
                        title: '노쇼 리스트',
                        url: 'NoshowListPage'
                    },
                ]
            }
        },
        created(){
            this.$http.get("/api/auth/login")
            .then((res)=>{
                const user = res.data.user;
                if (user) {
                    this.$store.commit("user/setUser", user);
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
            ...mapState({
            user: state=> state.user.user,
            })
        },
        methods: {
            logout: async function(){
                await this.$store.dispatch('user/logout');
                if(this.$router.currentRoute.path!='/'){
                    await this.$router.push({ path: '/'});
                }
                await this.$router.go();
            },
            myAccount(){
                if(this.$router.currentRoute.name!="MyAccountPage"){
                    this.$router.push({name: "MyAccountPage"});
                }
            }
        }
    }
</script>
