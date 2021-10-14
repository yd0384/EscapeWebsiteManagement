<template>
  <div>
    <h1 >Reservation</h1>
    [날짜/테마 선택]
    <div>
      <b-row>
        <b-col><b>
          {{ getbranchname }}<br>
          {{ value.getFullYear() }}년 
          {{ value.getMonth()+1 }}월
          {{ value.getDate() }}일
          {{ Days[value.getDay()] }}요일<br>
          예약목록입니다.
          </b></b-col>
        <b-col>
          <b-list-group horizontal>
            <b-list-group-item :class="{'active' : isSelected(branch.id) }" v-for="branch in branches" :key=branch.branch_id v-on:click="select_branch(branch.id)">
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
      <div v-if="themes">
        <b-row v-for="theme in themes" :key=theme.id>
          <b-container class="theme_box">
            <b-row>
              <b-col class="theme_poster">
                <b-img src="https://picsum.photos/600/300/?image=25" fluid alt="Responsive image"></b-img>
              </b-col>
              <b-col>
                <b-row class="theme_title">
                  <h3>{{ theme.title }}</h3>
                </b-row>
                <b-row class="time_area">
                  <!-- <b-button href="#" variant="primary" v-for="time in theme.start_times" :key="time">{{time}}</b-button> -->
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
export default {
  created() {
    console.log(this.$route.params.branch_id);
    this.$http.get('/api/theme')
      .then((res) => {
        this.branches = JSON.parse(res.data);
        this.selected_branch = this.selected_branch==0 ?  this.branches[0].branch_id: this.selected_branch;
        this.$http.get('/api/theme/get_themes', {params: {
          branch_id : this.selected_branch
        }})
          .then((res) => {
            this.themes = JSON.parse(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  computed : {
    getbranchname() {
      for(var idx in this.branches){
        if(this.branches[idx].id == this.selected_branch){
          return this.branches[idx].name;
        }
      }
    }
  },
  data()  {
    let selected_branch = this.$route.params.branch_id ? this.$route.params.branch_id : 0
    const limitDate = 30 //get limitDate from database
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    // 15th in two months
    const maxDate = new Date(today)
    maxDate.setDate(maxDate.getDate()+limitDate) 
    return {
      value: today,
      min: minDate,
      max: maxDate,
      Days: ['일', '월', '화', '수', '목', '금', '토'],
      selected_branch: selected_branch, 
      branches: [],
      themes: [],
    }  
  },
  methods:{
    isSelected: function(i) {
      return i === this.selected_branch;
    },
    select_branch(id){
      this.selected_branch=id;
      this.$http.get('/api/theme/get_themes', {params: {
          branch_id : this.selected_branch
      }})
        .then((res) => {
          this.themes = JSON.parse(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
}

</script>

