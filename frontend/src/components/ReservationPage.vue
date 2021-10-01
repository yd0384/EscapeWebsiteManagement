<template>
  <div>
    <h1>Reservation</h1>
    <div>
      <b-row>
        <b-col><b>{{ value.getFullYear() }}년 
          {{ value.getMonth()+1 }}월
          {{ value.getDate() }}일
          {{ Days[value.getDay()] }}요일
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
            :initial-date=today
            :value-as-date="true">
          </b-calendar>
        </b-col>
      </b-row>
      <hr class="mx-5">
      <b-row>
        <b-col>
          <b-card
            v-for="theme in branchs[selected_branch].themes" :key=theme.id
            :title="theme.name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-left
            tag="article"
            class="mb-5">
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
            <b-button href="#" variant="primary">예약하기</b-button>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data()  {
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
      selected_branch:0,
      branchs: [
        { 
          id: 0,
          name: '건대1호점' ,
          themes : [
            { 
              id: 0,
              name: '루시드드림',
            },
            {
              id: 1,
              name: '콜드케이스',
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
            }
          ]
        }
      ]
    }
  },
  methods:{
    select_branch(id){
      this.selected_branch=id;
    }
  }
}
</script>

