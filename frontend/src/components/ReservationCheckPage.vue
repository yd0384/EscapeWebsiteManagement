<template>
<div>
    <h1 style="margin-bottom:-5px;">Reservation</h1>
    [예약확인/취소]
    <h5 style="margin-top:50px;">예약할 때 사용하셨던 성명과 전화번호를 적어주십시오.</h5>
    <hr class="mx-5">
    <b-container>
        <b-row align-h="center">
            <b-col md="auto"><label for="input-small">예약자명</label></b-col>
            <b-col md="auto"><b-form-input type="text" style="width:80px; height:25px;" class="input"></b-form-input></b-col>
            <b-col md="auto"><label for="input-small">전화번호</label></b-col>
            <b-col md="auto"><b-form-select v-model="selected" :options="options" value-field="item" text-field="name" style="margin-bottom: 0.6px; width:60px; height:25px; font-size : 0.7rem;"></b-form-select></b-col>
            <b-col md='auto'><b-input type="text" style="width:60px; height:25px; font-size : 0.9rem;" class="input"></b-input></b-col>
            <b-col md='auto'><b-input type="text" style="width:60px; height:25px; font-size : 0.9rem;" class="input"></b-input></b-col>
            <b-button class="confirm_button" style="height:25px; font-size:10px" variant="primary">예약확인</b-button>
        </b-row>
    </b-container>
</div>
</template>

<script>
  export default {
    data() {
      return {
        selected: '010',
        options: [
          { item: '010', name: '010' },
          { item: '011', name: '011' },
          { item: '016', name: '016' },
          { item: '017', name: '017' },
          { item: '018', name: '018' },
          { item: '019', name: '019' }
        ]
      }
    }
  }
</script>

