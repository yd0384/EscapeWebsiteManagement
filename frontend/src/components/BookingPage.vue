<template>
  <div>
    <h1 style="margin-bottom:-5px;">Reservation</h1>
    [예약정보입력]<br>
    <b-badge class="py-4" style="font-size:18px; opacity:0.5; margin-top:20px;">
      {{ Play_Date.getFullYear() }}년 {{ Play_Date.getMonth()+1 }}월 {{ Play_Date.getDate() }}일 {{ Days[Play_Date.getDay()] }}요일 {{ branch_name }} {{ theme_name }} 테마 예약을 진행합니다</b-badge>
    <hr class="mx-5">
    <h4 style="margin-bottom:50px;">예약정보</h4>
    <b-container style="width:35%">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="지점명: "
          label-for="input-1"
          label-cols="12" label-cols-sm="2"
        >
          <b-form-input
            id="input-1"
            v-model="branch_name"
            disabled
            style="background-color: #FFFFFF; text-align: center; border: 0px;"
          ></b-form-input>
        </b-form-group>
        <hr style="width:100%; margin-top:5px;">
        <b-form-group
          id="input-group-2"
          label="예약일: "
          label-for="input-2"
          label-cols="12" label-cols-sm="2"
        >
          <b-form-input
            id="input-2"
            v-model="play_date"
            disabled
            style="background-color: #FFFFFF; text-align: center; border: 0px;"
          ></b-form-input>
        </b-form-group>
        <hr style="width:100%; margin-top:5px;">
        <b-form-group
          id="input-group-3"
          label="예약시간: "
          label-for="input-3"
          label-cols="12" label-cols-sm="2"
        >
          <b-form-input
            id="input-3"
            v-model="items[2]"
            disabled
            style="background-color: #FFFFFF; text-align: center; border: 0px;"
          ></b-form-input>
        </b-form-group>
        <hr style="width:100%; margin-top:5px;">
        <b-form-group
          id="input-group-4"
          label="테마명: "
          label-for="input-4"
          label-cols="12" label-cols-sm="2"
        >
          <b-form-input
            id="input-4"
            v-model="theme_name"
            disabled
            style="background-color: #FFFFFF; text-align: center; border: 0px;"
          ></b-form-input>
        </b-form-group>
        <hr style="width:100%; margin-top:5px;">
        <b-form-group
          id="input-group-5"
          label="예약자명: "
          label-for="input-5"
          label-cols="12" label-cols-sm="2"
        >
          <b-form-input
            id="input-5"
            v-model="booker_name"
            required
            style="text-align: center;"
          ></b-form-input>
        </b-form-group>
        <hr style="width:100%; margin-top:5px;">
          <b-form-group
          id="input-group-6"
          label="전화번호: "
          label-for="input-6"
          label-cols="12" label-cols-sm="2"
        >
          <b-form-select
            id="input-6"
            v-model="firstphone"
            :options="options"
            value-field="item"
            text-field="name"
            style="background-color: #FFFFFF; text-align: center; width:100px;"
            class="custom-control-inline"
          ></b-form-select>
          <b-form-input
            id="input-7"
            v-model="secondphone"
            :state="validate_secondphone"
            style="background-color: #FFFFFF; text-align: center; width:100px;"
            class="custom-control-inline"
          ></b-form-input>
          <b-form-input
            id="input-8"
            v-model="thirdphone"
            :state="validate_thirdphone"
            style="background-color: #FFFFFF; text-align: center; width:100px;"
            class="custom-control-inline"
          ></b-form-input>
          <hr style="width:100%; margin-top:5px;">
        </b-form-group>
        <b-form-group
          id="input-group-7"
          required
          label="인원: "
          label-for="input-9"
          label-cols="12" label-cols-sm="2"
        >
          <b-form-select
            id="input-9"
            v-model="idx"
            :options="headcounts"
            value-field="idx"
            text-field="name"
            required
            style="text-align: center"
          ></b-form-select>
        </b-form-group>
        <hr style="width:100%; margin-top:5px;">
        <b-form-group
          id="input-group-10"
          label="이용가격: "
          label-for="input-10"
          label-cols="12" label-cols-sm="2"
        >
          <b-form-input
            id="input-10"
            v-model="cost[idx]"
            disabled
            style="background-color: #FFFFFF; text-align: center; border: 0px;"
          ></b-form-input>
        </b-form-group>
        <hr style="width:100%; margin-top:5px;">
        <b-button type="submit" variant="primary" class="p-2 mx-2"> 예약하기 </b-button>
        <b-button type="reset" class="p-2 mx-2"> 초기화 </b-button>
      </b-form>
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
      play_date: function(){
        return this.Play_Date.getFullYear()+'년 '+(this.Play_Date.getMonth()+1)+'월 '+this.Play_Date.getDate()+'일';
      },
      validate_secondphone: function() {
        return this.secondphone.length >2 && this.secondphone.length <5 && !isNaN(this.secondphone);
      },
      validate_thirdphone: function() {
        return this.thirdphone.length==4 && !isNaN(this.thirdphone);
      },
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
      onSubmit: function(event){
        event.preventDefault(event);
        if(this.validate_secondphone && this.validate_thirdphone){
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
            this.$router.push({name: 'ReservationCompletePage', params: { play_date: this.play_date, theme_name: this.theme_name, branch_name: this.branch_name }});
          })
          .catch(error=>{
            console.error(error);
          })
        }
        else{
          alert('올바른 전화번호를 입력해주세요.');
        }
      },
      onReset: function(event){
        event.preventDefault();
        this.idx=0;
        this.secondphone='';
        this.thirdphone='';
        this.booker_name='';
        this.firstphone='010';
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

