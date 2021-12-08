<template>
<div>
    <h1 style="margin-bottom:-5px;">Reservation</h1>
    [예약확인/취소]
    <div v-if="show">
      <h5 style="margin-top:50px;">예약할 때 사용하셨던 성명과 전화번호를 적어주십시오.</h5>
      <hr class="mx-5">
      <b-container>
          <b-row align-h="center">
            <b-form @submit="onSubmit" @reset="onReset" inline>
              <b-form-group
                id="input-group-1"
                label="예약자명:"
                label-for="input-1"
                label-cols="auto"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.booker_name"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="전화번호:"
                label-for="input-2"
                class="mx-5"
                label-cols="auto"
              >
                <b-form-select
                  id="input-2"
                  v-model="form.firstphone"
                  :options="options"
                  required
                  style="width:100px;"
                ></b-form-select>
                <b-form-input
                  id="input-3"
                  v-model="form.secondphone"
                  type="text"
                  :state="validate_secondphone"
                  style="width:100px;"
                ></b-form-input>
                <b-form-input
                  id="input-4"
                  v-model="form.thirdphone"
                  type="text"
                  :state="validate_thirdphone"
                  style="width:100px;"
                ></b-form-input>
              </b-form-group>
              <b-button class="confirm_button"  variant="primary" type="submit">예약확인</b-button>
            </b-form>
          </b-row>
      </b-container>
    </div>
    <div v-else>
      <h3> 예약정보 </h3>
      <h5 v-for="reservation in booker_reservations" :key="reservation.id">       
        예약자 성함: {{ reservation.booker_name }}<br>
        지점명: {{ branch_name(reservation.theme_id) }}<br>
        테마명: {{ theme_name(reservation.theme_id) }}<br>
        플레이 일정: {{ DBdatetimeToString(reservation.start_time) }}<br>
        예약한 시간: {{ DBdatetimeToString(reservation.reserved_time) }}<br>
        상태: {{ getStatus(reservation.status) }}<br>
        <b-button class="delete_submit_button" @click="onDelete(reservation.id)" v-if="reservation.status===0" type="submit" variant="primary"> 예약취소</b-button>
      </h5>
      <b-button class="reenter_infomation" type="reset" @click="onReset" variant="primary">확인</b-button>
    </div>
</div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  export default {
    created () {
      this.$store.dispatch('theme/fetch_branches'),
      this.$store.dispatch('theme/fetch_themes')  
    },
    computed: {
      ...mapState({
        booker_reservations: state=> state.reservation.booker_reservations,
        themes: state=> state.theme.themes,
        branches: state=> state.theme.branches
      }),
      ...mapGetters('theme',{
        theme_name: 'getThemeNameById',
        branch_name: 'getBranchNameByThemeId'
      }),
      validate_secondphone: function() {
        return this.form.secondphone.length >2 && this.form.secondphone.length <5 && !isNaN(this.form.secondphone);
      },
      validate_thirdphone: function() {
        return this.form.thirdphone.length==4 && !isNaN(this.form.thirdphone);
      }
    },
    data() {
      return {
        form: {
          booker_name: "",
          firstphone: "010",
          secondphone: "",
          thirdphone: "",  
        },
        Days: ['일', '월', '화', '수', '목', '금', '토'],
        show: true,
        options: [
          '010',
          '011',
          '016',
          '017',
          '018',
          '019'
        ]
      }
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault();
        if(this.validate_secondphone && this.validate_thirdphone){
          let payload = {
          booker_name: this.form.booker_name,
          phone_number: this.form.firstphone+'-'+this.form.secondphone+'-'+this.form.thirdphone
          };
          await this.$store.dispatch('reservation/fetch_reservations_of_booker',payload)
            .then((empty)=>{
              if(empty==='empty'){
                alert('해당 예약 내역이 없습니다.');
                this.onReset(event);
              }
              else{
                this.show=false;
              }
            })
            .catch(error=>{
              console.error(error);
            });
        }
        else{
          alert('올바른 전화번호를 입력해주세요.');
        }
      },
      onReset(event) {
        event.preventDefault();
        this.show=true;
        this.form.booker_name="";
        this.form.firstphone="010";
        this.form.secondphone="";
        this.form.thirdphone="";
      },
      onDelete(id) {
        this.$store.dispatch('reservation/delete_reservation_of_booker', id)
        .then(result=>{
          alert("예약 취소 완료");
          if(this.booker_reservations.length<2){
            this.$router.go();
          }
        })
        .catch(error=>{
          console.error(error);
        });
      },
      getStatus(status){
        switch(status){
          case 0: 
            return '플레이 이전'
          case 1: 
            return '플레이 완료'
          case 2:
            return '노쇼'
        }
      },
      DBdatetimeToString(tzString){
        let time = new Date(tzString.slice(0,-1));
        time.setHours(time.getHours()+9);
        return time.getFullYear()+"년 "+ (time.getMonth()+1) + "월 "+time.getDate()+"일 "+this.Days[time.getDay()]+"요일 "+((time.getHours()<10)?'0'+time.getHours():time.getHours())+":"+((time.getMinutes()<10)?'0'+time.getMinutes():time.getMinutes());
      }
    }
  }
</script>

