<template>
  <div>
    <h1>Reservation</h1>
    <div>
      <b-row>
        <b-col><b>
          {{ branchs[selected_branch].name }}<br>
          {{ value.getFullYear() }}년 
          {{ value.getMonth()+1 }}월
          {{ value.getDate() }}일
          {{ Days[value.getDay()] }}요일<br>
          예약목록입니다.
          </b></b-col>
        <b-col>
          <b-list-group horizontal>
            <b-list-group-item v-for="branch in branchs" :key=branch.id v-on:click="select_branch(branch.id)">
              {{ branch.name }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <b-calendar v-model="value"
            :hide-header="true" 
            :min="min"
            :max="max"
            :initial-date=value
            :value-as-date="true">
          </b-calendar>
        </b-col>
      </b-row>
      <hr class="mx-5">
      <b-row v-for="theme in branchs[selected_branch].themes" :key=theme.id>
        <b-container class="theme_box">
          <b-row :title="theme.name">
            <b-col class="theme_poster">
              <b-img src="https://picsum.photos/600/300/?image=25" fluid alt="Responsive image"></b-img>
            </b-col>
            <b-col>
              <b-row class="theme_title">
                <h3>{{ theme.name }}</h3>
              </b-row>
              <b-row class="time_area">
                <b-button href="#" variant="primary" v-for="time in theme.start_times" :key="time">{{time}}</b-button>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </b-row>
    </div>
  </div>
</template>

<script>
//시간 받는법 theme별로 시작시간들이 정해져있음, 예약에서 해당 날짜 예약들을 조회, 있으면 그 시간 예약 예약불가, 없다면 예약가능
export default {
  data()  {
    const limitDate = 30 //get limitDate from database
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    // 15th in two months
    const maxDate = new Date(today)
    maxDate.setDate(maxDate.getDate()+limitDate) 
    let selected_branch = this.$route.params.branch_id ? this.$route.params.branch_id : 0
    return {
      value: today,
      min: minDate,
      max: maxDate,
      Days: ['일', '월', '화', '수', '목', '금', '토'],
      selected_branch: selected_branch,
      branchs: [
        { 
          id: 0,
          name: '건대1호점' ,
          themes : [
            { 
              id: 0,
              name: '루시드드림',
              start_times: ['10:00', '12:30', '14:00', '15:45', '17:00'],
              theme_length: 75
            },
            {
              id: 1,
              name: '콜드케이스',
              start_times: ['10:00', '12:30', '14:00', '15:45', '17:00'],
              theme_length: 60
            }
          ]
        },
        { 
          id: 1,
          name: '건대2호점' ,
          themes : [
            { 
              id: 0,
              name: '디어마르시',
              start_times: ['10:00', '12:30', '14:00', '15:45', '17:00'],
              theme_length: 60
            }
          ]
        }
      ]
    }
  },
  methods:{
    select_branch(id){
      this.selected_branch=id;
    },
  },
}

</script>

