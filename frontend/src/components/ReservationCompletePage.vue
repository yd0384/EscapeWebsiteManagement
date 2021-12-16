<template>
  <div>
    <h1 style="margin-bottom:-5px;">Reservation</h1>
    [예약완료]
    <div style="margin-top:50px;">
      <h1><b-badge variant="primary" style="opacity:0.6;" class="py-5">{{ $route.params.play_date }} {{$route.params.branch_name}} {{$route.params.theme_name}}테마 예약이 완료되었습니다.</b-badge></h1>
    </div>
    <b-button v-on:click="complete_booking" variant="primary" style="margin-top:50px; width:80px;">완료</b-button>
  </div>
</template>

<script>
export default {
  methods:{
    complete_booking(){
      this.$router.push({name: 'MainPage'});
    }
  }
  
}

</script>

