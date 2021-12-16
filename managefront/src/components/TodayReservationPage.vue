<template>
    <div id="total_reservation">
        <h1 >{{branchName}} 당일 예약</h1>
        <hr/>
        <b-card-group v-for="theme in todayReservation" :key="theme.id">
            <h4 style="width:200px; align-self:center;">{{theme.title}}</h4>
            <b-card v-for="time in theme.time_table" :key="time.id" :header="time.start_time">
                <b-card-text v-if="time.reservation!=null" @click="toDetailPage(time.reservation, theme.title)">
                    <div style="text-align:start;">
                        예약자명: {{time.reservation.booker_name}}<br>
                        인원수: {{time.reservation.number_of_player}} 명<br>
                        연락처: {{time.reservation.phone_number}}<br>
                        <b-badge v-if="time.reservation.status==0" variant="success">예약완료</b-badge>
                    </div>
                </b-card-text>
                <b-card-text v-else @click="toNewBookingPage()"><b-badge variant="secondary">예약없음</b-badge></b-card-text>
            </b-card>
        </b-card-group>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
const now=new Date();
export default {
    data(){
        return {
            Days: ['일', '월', '화', '수', '목', '금', '토'],
        }
    },
    computed: {
        rows() {
            return this.reservations.length
        },
        ...mapState({
            user: state=> state.user.user,
            todayReservation: state=> state.reservation.todayReservationList,
        }),
        ...mapGetters('branch', {
            branchName: 'getBranchName'
        })
    },
    created() {
        this.$store.dispatch('branch/fetch_branch_info');
        this.$store.dispatch('reservation/fetch_today_reservations', {bid: this.user.branch_id, date:new Date(now.getFullYear(), now.getMonth(), now.getDate())});
    },
    methods: {
        DBdatetimeToString(tzString){
            let time = new Date(tzString.slice(0,-1));
            time.setHours(time.getHours()+9);
            return time.getFullYear()+"년 "+ (time.getMonth()+1)+"월 "+time.getDate()+"일 "+this.Days[time.getDay()]+"요일 "+((time.getHours()<10)?'0'+time.getHours():time.getHours())+":"+((time.getMinutes()<10)?'0'+time.getMinutes():time.getMinutes());
        },
        StringToDBdate(String){
            var regex = /[^0-9]/g;
            var result = String.replace(regex, "");
            return result.slice(0, 4) + "-"+result.slice(4,6)+"-"+result.slice(6,8)+"T"+result.slice(8,10)+":"+result.slice(10,12)+"Z";
        },
        toDetailPage(reservation, title){
            var  params = {};
            params = Object.assign(params,reservation);
            const statusString = ['플레이 이전', '플레이 완료', '노쇼', '취소된 예약'];
            params.status=statusString[params.status];
            params.title=title;
            params.start_time = params.start_datetime;
            params.reserved_time= params.reserved_datetime;
            this.$router.push({name: 'ReservationDetailPage', params: params});
        },
        toNewBookingPage(){
            this.$router.push({name:'NewReservationPage'});
        }
    }
}
</script>

<style>
    #total_reservation_table{
        text-align:middle;
    }
    #total_reservation {
    margin: 20px;
    }
    .search_box{
        margin-bottom:20px;
    }
    .search_button,
    .input,
    .select {
        margin-right: 5px;
    }
</style>