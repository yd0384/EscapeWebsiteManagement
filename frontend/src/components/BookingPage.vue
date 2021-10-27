<template>
  <div>
    <h1 style="margin-bottom:-5px;">Reservation</h1>
    [예약정보입력]<br>
    <b-badge variant="info" style="font-size:18px; opacity:0.3; margin-top:20px; height:50px;">
      {{ Play_Date.getFullYear() }}년 {{ Play_Date.getMonth()+1 }}월 {{ Play_Date.getDate() }}일 {{ Days[Play_Date.getDay()] }}요일 {{ branch_name }} {{ theme_name }} 테마 예약을 진행합니다</b-badge>
    <hr class="mx-5">
    <h4 style="margin-bottom:50px;">예약정보</h4>
    <b-container style="width:35%">
      <b-row align-h="center">
        <b-col align-self="start"><b>지점명</b></b-col>
        <b-col align-self="center">{{ branch_name }}</b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>예약일</b></b-col>
        <b-col align-self="center">{{ Play_Date.getFullYear() }}년 {{ Play_Date.getMonth()+1 }}월 {{ Play_Date.getDate() }}일</b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>예약시간</b></b-col>
        <b-col align-self="center">{{ items[2] }}</b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>테마명</b></b-col>
        <b-col align-self="center">{{ theme_name }}</b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>예약자명</b></b-col>
        <b-col align-self="center"><b-input type="text" style="height:25px; font-size : 0.9rem;" class="input" v-model="booker_name"></b-input></b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>전화번호</b></b-col>
        <b-col align-self="center">
          <div>
            <b-row align-v="center" cols="3">
              <b-col><b-form-select v-model="firstphone" :options="options" value-field="item" text-field="name" style="margin-bottom: 0.5px; width:60px; height:25px; font-size : 0.7rem;"></b-form-select>
              </b-col>
              <b-col><b-input type="text" style="width:60px; height:25px; font-size : 0.9rem;" class="input" v-model="secondphone"></b-input></b-col>
              <b-col><b-input type="text" style="width:60px; height:25px; font-size : 0.9rem;" class="input" v-model="thirdphone"></b-input></b-col>
            </b-row>
          </div>
        </b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>인원</b></b-col>
        <b-col align-self="center"><b-form-select v-model="idx" :options="headcounts" value-field="idx" text-field="name" style="margin-bottom: 0.5px; width:60px; height:25px; font-size : 0.65rem;"></b-form-select></b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>이용가격</b></b-col>
        <b-col align-self="center" style="color:blue;"><strong>{{ cost[idx] }}</strong></b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row>
        <b-col align-self="start"><b-button @click="postBooking" variant="primary">예약하기 </b-button></b-col>
        <b-col align-self="end"><b-button @click="redirectToReservation">돌아가기 </b-button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { createReservation } from '../api';
  export default {
    created() {
    this.$store.dispatch('theme/fetch_branches'),
    this.$store.dispatch('theme/fetch_themes'),
    this.$store.dispatch('reservation/fetch_costinfo', this.$route.params.items[1]),
    this.$store.dispatch('reservation/getUserIP')
    },
    computed : {
      ...mapState({
        cost_info: state=> state.reservation.cost_info,
        user_ip: state=> state.reservation.user_ip
      }),
      ...mapGetters('theme', {
        theme_name: 'getThemeName',
        branch_name: 'getBranchName'
      }),
      ...mapGetters('reservation', {
        cost: 'getCost',
        headcounts: 'getHeadCounts'
      }),
    },
    data() {
      return {
        booker_name: '',
        items: this.$route.params.items,
        Play_Date: new Date(this.$route.params.items[4]),
        secondphone: '',
        thirdphone: '',
        Days: ['일', '월', '화', '수', '목', '금', '토'],
        firstphone: '010',
        idx: 0,
        options: [
          { item: '010', name: '010' },
          { item: '011', name: '011' },
          { item: '016', name: '016' },
          { item: '017', name: '017' },
          { item: '018', name: '018' },
          { item: '019', name: '019' }
        ],
      }
    },
    methods: {
      postBooking: function(){
        let st = this.get_hour_and_minute(this.items[2]);
        let en = this.get_hour_and_minute(this.items[3]);
        let start_day = new Date(this.Play_Date);
        let end_day = new Date(this.Play_Date);
        let start_time=this.date_to_mysql(start_day.setHours(st[0],st[1]));
        let end_time=this.date_to_mysql(end_day.setHours(en[0],en[1]));
        let payload = {
          theme_id: this.items[1],
          start_time: start_time,
          end_time: end_time,
          status: 0,
          reserved_time: this.date_to_mysql(new Date()),
          number_of_player: this.headcounts[this.idx].item,
          phone_number: this.firstphone+'-'+this.secondphone+'-'+this.thirdphone,
          booker_name: this.booker_name,
          booker_ip: this.user_ip
        };
        createReservation(payload)
        .then(res => {
          this.$router.push({name: 'ReservationCompletePage'});
        })
        .catch(error=>{
          console.log(error);
        })
      },
      date_to_mysql: function(d){
        let time = new Date(d)
        time.setHours(time.getHours()+9);
        return time.toISOString().slice(0,19).replace('T',' ');
      },
      get_hour_and_minute: function(s){
        var arr= s.split(':');
        for(var i in arr){
          arr[i]=Number(arr[i]);
        }
        return arr;
      },
      redirectToReservation: function(){
        this.$router.push({name: "ReservationPage", params: { branch_id: this.items[0] }});
      }
    }
  }
</script>

