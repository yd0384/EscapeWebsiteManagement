<template>
  <div>
    <h1 style="margin-bottom:-5px;">Reservation</h1>
    [날짜/테마 선택]
    <div style="margin-top:50px;">
      <b-row align-h="center">
        <b-col><b>
          <h1 style="margin-bottom:-25px;">{{ branch_info[0] }}</h1><br>
          {{ value.getFullYear() }}년 
          {{ value.getMonth()+1 }}월
          {{ value.getDate() }}일
          {{ Days[value.getDay()] }}요일<br>
          <h4>예약목록입니다.</h4>
          </b></b-col>
        <b-col>
          <b-list-group horizontal>
            <b-list-group-item :class="{'active' : isSelected(branch.id) }" v-for="branch in branches" :key=branch.id v-on:click="select_branch(branch.id)">
              {{ branch.name }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <b-calendar v-model="value"
            v-on:change="change_date"
            :hide-header="true" 
            :min="min"
            :max="max"
            :initial-date=value
            :value-as-date="true">
          </b-calendar>
        </b-col>
      </b-row>
      <hr class="mx-5">
      <div v-if="themes">
        <b-row v-for="theme in theme_view" :key=theme.id>
          <b-container class="theme_box">
            <b-row>
              <b-col class="theme_poster">
                <b-img src="https://picsum.photos/600/300/?image=25" fluid alt="Responsive image"></b-img>
              </b-col>
              <b-col>
                <b-row class="theme_title">
                  <b-col>
                    <h3><strong>{{ theme.title }}</strong></h3>
                  </b-col>
                  <b-col>
                     문제구성 : 장치 {{ theme.device_importance }}%, 자물쇠 {{ get_lock_importance(theme.device_importance) }}%
                  </b-col>
                </b-row>
                <b-row class="theme_info">
                  <b-col>
                    장르 : {{ theme.genres }}
                  </b-col>
                  <b-col>
                    난이도 : <b-form-rating v-model = "theme.difficulty" readonly></b-form-rating>
                  </b-col>
                  <b-col>
                    플레이시간 : {{ theme.length }}분
                  </b-col>
                  <b-col>
                    권장인원 : {{ theme.recommended_number }}
                  </b-col>
                </b-row>
                <b-row class="time_area mb-2" v-for="time in timetable_view[theme.id]" :key="time.id">
                  
                  <b-col>
                    <b-button v-on:click="postBooking(time.start_time)" variant="primary">{{ time.start_time }}</b-button>
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
    this.$store.dispatch('reservation/fetch_reservations', this.value)
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
      }
    }
  },
  data()  {
    const limitDate = 30 //get limitDate from database
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    const maxDate = new Date(today)
    maxDate.setDate(maxDate.getDate()+limitDate) 
    return {
      init_branch: this.$route.params.branch_id ? this.$route.params.branch_id : 0,
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
      console.log(new Date());
      this.$store.commit('theme/select_branch', id);
      this.change_date();
      if(this.value.getTime()>this.max.getTime()){
        const now = new Date();
        this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      }
    },
    change_date: function(){
      if (this.branch_info[1] != -1){
        const now = new Date();
        this.max = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.max.setDate(this.max.getDate() + this.branch_info[1]);
      }
    },
    get_lock_importance(device_importance){
      return 100-device_importance;
    },
    postBooking: function(start_time) {
      this.$router.push({name: 'BookingPage', params: {time: this.value}});
    }
  },
}

</script>

