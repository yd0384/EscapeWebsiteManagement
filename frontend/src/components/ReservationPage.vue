<template>
  <div>
    <h1 style="margin-bottom:-5px;">Reservation</h1>
    [날짜/테마 선택]
    <div style="margin-top:50px;">
      <b-row style="margin-bottom:50px;">
        <b-col align-self="center" style="display:flex; justify-content:flex-end;">
          <b-list-group vertical style="width:200px;">
            <b-list-group-item :class="{'active' : isSelected(branch.id) }" v-for="branch in branches" :key=branch.id v-on:click="select_branch(branch.id)">
              {{ branch.name }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col align-self="center">
          <h1 style="margin-bottom:-20px;"><b>{{ branch_info[0] }}</b></h1><br>
          <h2 style="margin-bottom:-20px;">
            <b style="font-size:40px;">{{ value.getFullYear() }}</b>년 
            <b style="font-size:40px;">{{ value.getMonth()+1 }}</b>월
            <b style="font-size:40px;">{{ value.getDate() }}</b>일
            <b style="font-size:40px;">{{ Days[value.getDay()] }}</b>요일
          </h2><br>
          <h3><strong>예약현황</strong>입니다.</h3>
        </b-col>
        <b-col style="display:flex; justify-content:flex-start;">
          <b-calendar v-model="value"
            v-on:change="change_date"
            :hide-header="true" 
            :min="min"
            :max="max"
            :initial-date="today"
            :value-as-date="true">
          </b-calendar>
        </b-col>
      </b-row>
      <hr class="mx-5">
      <div v-if="themes" style="margin-top:50px;">
        <b-row v-for="theme in theme_view" :key=theme.id>
          <b-container class="theme_box">
            <b-row>
              <b-col class="theme_poster">
                <b-img src="https://picsum.photos/600/300/?image=25" fluid alt="Responsive image" style="width:300px; height:250px; margin-bottom:50px"></b-img>
              </b-col>
              <b-col cols="8">
                <b-row class="theme_title" style="margin-bottom:10px;">
                  <b-col style="text-align:left;">
                    <h3 style="font-size:40px;"><strong>{{ theme.title }}</strong></h3>
                  </b-col>
                  <b-col align-self="start" style="text-align:right">
                     문제구성 : 장치 {{ theme.device_importance }}%, 자물쇠 {{ get_lock_importance(theme.device_importance) }}%
                  </b-col>
                </b-row>
                <b-row class="theme_info" style="margin-bottom:-15px;">
                  <b-col align-self="end" style="text-align:left;">
                    장르 : {{ theme.genres }}
                  </b-col>
                  <b-col align-self="end" style="text-align:left;">
                    플레이시간 : {{ theme.length }}분
                  </b-col>
                  <b-col align-self="end" style="text-align:left;">
                    권장인원 : {{ theme.recommended_number }}
                  </b-col>
                  <b-col align-self="end" style="text-align:left;">
                    <b-form-rating v-model = "theme.difficulty" variant="warning" readonly no-border style="height:30px;"></b-form-rating>
                  </b-col>
                </b-row>
                <hr class="mx">
                <b-row class="time_area mb-2" cols="4" style="margin-top:20px">
                  <b-col v-for="time in timetable_view[theme.id]" :key="time.id" style="margin-bottom:20px">
                    <b-button v-if="reservation_availability(time.start_time, theme.id)" v-on:click="postBooking([selected_branch, theme.id, time.start_time, time.end_time, value])" variant="primary" style="width:150px; height:55px; word-spacing:10px;"><strong>{{ time.start_time }} 예약가능</strong></b-button>
                    <b-button v-else disabled style="width:150px; height:55px; word-spacing:10px;"><strong>{{ time.start_time }} 예약불가</strong></b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
//시간 받는법 theme별로 시작시간들이 정해져있음, 예약에서 해당 날짜 예약들을 조회, 있으면 그 시간 예약 예약불가, 없다면 예약가능
import { mapState, mapGetters } from 'vuex'
export default {
  created() {
    this.$store.dispatch('theme/fetch_branches'),
    this.$store.dispatch('theme/fetch_themes'),
    this.$store.dispatch('theme/fetch_timetables'),
    this.$store.dispatch('reservation/fetch_reservations', this.date_to_mysql(this.value))
  },
  mounted() {
    let now = new Date();
    this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  },
  computed : {
    ...mapGetters('theme', {
      theme_view: 'getThemeView',
      timetable_view: 'getTimeTableView',
      branch_info: 'getBranchNameAndReservableDate',
    }),
    ...mapGetters('reservation', {
      reservation_view: 'getReservationByTheme'
    }),
    ...mapState({
    branches: state => state.theme.branches,
    themes: state => state.theme.themes,
    selected_branch: state => state.theme.selected_branch,
    timetables: state=> state.theme.timetables,
    reservations: state=>state.reservation.reservations,
    }),
    value: {
      get () {
        return this.$store.state.reservation.date;
      },
      set (value) {
        this.$store.commit('reservation/set_date', value);
        this.change_date();
      }
    }
  },
  data()  {
    const limitDate=30
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    const maxDate = new Date(today)
    maxDate.setDate(maxDate.getDate()+limitDate) 
    return {
      today: today,
      min: minDate,
      max: maxDate,
      Days: ['일', '월', '화', '수', '목', '금', '토'], 
    }
  },
  methods:{
    isSelected: function(i) {
      return i === this.selected_branch;
    },
    select_branch(id){
      this.$store.commit('theme/select_branch', id);
      this.change_date();
      if(this.value.getTime()>this.max.getTime()){
        const now = new Date();
        this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      }
    },
    change_date: function(){
      this.$store.dispatch('reservation/fetch_reservations', this.date_to_mysql(this.value));
      if (this.branch_info[1] != -1){
        const now = new Date();
        this.max = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.max.setDate(this.max.getDate() + this.branch_info[1]);
      }
      else{
        const now = new Date();
        this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      }
    },
    get_lock_importance(device_importance){
      return 100-device_importance;
    },
    postBooking: function(items) {
      this.$router.push({name: 'BookingPage', params: {items: items}});
    },
    date_to_mysql: function(d){
      let time = new Date(d)
      time.setHours(time.getHours()+9);
      time = time.toISOString().slice(0,19).replace('T',' ');
      return time;
    },
    reservation_availability(start_time, tid){
      let play_time = new Date(this.value);
      let time = start_time.split(':');
      time[0] = parseInt(time[0]);
      time[1] = parseInt(time[1]);
      play_time= new Date(play_time.setHours(time[0], time[1]));
      if (play_time.getTime()<new Date().getTime()){
        return false;
      }
      else{
        if(this.reservation_view[tid].length===0){
          return true;
        }
        else{
          for(var i in this.reservation_view[tid]){
            let tzString = this.reservation_view[tid][i].start_time;
            let start = new Date(tzString.slice(0,-1));
            start.setHours(start.getHours()+9);
            let h = start.getHours();
            let m = start.getMinutes();
            start = ((h<10)?'0'+h:h)+":"+((m<10)?'0'+m:m);
            if(start_time === start){
              return false;
            }
          }
          return true;
        }
      }
    }
  },

}

</script>

