<template>
    <div id="total_reservation">
        <h1>{{branchName}} 당일 예약</h1>
        <b-card-group v-for="theme in todayReservation" :key="theme.id">
            <h1>{{theme.title}}</h1>
            <b-card v-for="time in theme.time_table" :key="time.id" :title="time.start_time">
                <b-card-text v-if="time.reservation!=null">{{time.reservation}}</b-card-text>
                <b-card-text v-else>예약 없음</b-card-text>
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