<template>
  <div>
    <h1 style="margin-bottom:-5px;">Reservation</h1>
    [예약정보입력]<br>
    <b-badge variant="info" style="font-size:18px; opacity:0.3; margin-top:20px; width:500px; height:50px;">
      2021년 9월 21일 A지점 A테마 예약을 진행합니다</b-badge>
    <hr class="mx-5">
    <h4 style="margin-bottom:50px;">예약정보</h4>
    <b-container style="width:35%">
      <b-row align-h="center">
        <b-col align-self="start"><b>지점명</b></b-col>
        <b-col align-self="center">강남점</b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>예약일</b></b-col>
        <b-col align-self="center">2021년 9월 21일</b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>예약시간</b></b-col>
        <b-col align-self="center">21:30</b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>테마명</b></b-col>
        <b-col align-self="center">Lucid Dream</b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>예약자명</b></b-col>
        <b-col align-self="center"><b-input type="text" style="height:25px; font-size : 0.9rem;" class="input"></b-input></b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>전화번호</b></b-col>
        <b-col align-self="center">
          <div>
            <b-row align-v="center" cols="3">
              <b-col><b-form-select v-model="selected" :options="options" value-field="item" text-field="name" style="margin-bottom: 0.5px; width:60px; height:25px; font-size : 0.7rem;"></b-form-select>
              </b-col>
              <b-col><b-input type="text" style="width:60px; height:25px; font-size : 0.9rem;" class="input"></b-input></b-col>
              <b-col><b-input type="text" style="width:60px; height:25px; font-size : 0.9rem;" class="input"></b-input></b-col>
            </b-row>
          </div>
        </b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>인원</b></b-col>
        <b-col align-self="center"><b-form-select v-model="selected_count" :options="headCount" value-field="item" text-field="name" style="margin-bottom: 0.5px; width:60px; height:25px; font-size : 0.65rem;"></b-form-select></b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row align-h="center">
        <b-col align-self="start"><b>이용가격</b></b-col>
        <b-col align-self="center" style="color:blue;"><strong>44,000원</strong></b-col>
        <b-col align-self="end"></b-col>
      </b-row>
      <hr style="width:100%; margin-top:5px;">
      <b-row>

      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: "Receive",
    data() {
      return {
        id : this.$route.params.id,
        selected: '010',
        options: [
          { item: '010', name: '010' },
          { item: '011', name: '011' },
          { item: '016', name: '016' },
          { item: '017', name: '017' },
          { item: '018', name: '018' },
          { item: '019', name: '019' }
        ],
        selected_count:'2',
        headCount: [
          { item: '1', name:'1명'},
          { item: '2', name:'2명'},
          { item: '3', name:'3명'},
          { item: '4', name:'4명'},
          { item: '5', name:'5명'},
          { item: '6', name:'6명'}
        ],
        types: [
          '지점명',
          '예약일',
          '예약시간',
          '테마명',
          '예약자명',
          '전화번호',
          '인원',
          '이용가격'
        ],
        testData: [
          '강남점',
          '2021년 9월 21일',
          '21:30',
          'Lucid Dream',
          '전진종',
          '010-2058-5495',
          '2명',
          '44,000원'
        ]
      }
    }
  }
</script>

