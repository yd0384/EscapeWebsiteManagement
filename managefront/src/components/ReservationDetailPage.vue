<template>
    <div>
        <h1 style="margin-bottom:50px;">{{branchName}} 예약정보</h1>
        <hr/>
        <b-container style="width:35%">
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                id="input-group-1"
                label="예약번호: "
                label-for="input-1"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-1"
                    v-model="form.id"
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
                    v-model="form.start_date"
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
                    v-model="form.start_time"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-4"
                label="예약한 시간: "
                label-for="input-3"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-4"
                    v-model="form.reserved_time"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-5"
                label="테마명: "
                label-for="input-5"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-5"
                    v-model="form.title"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-6"
                label="예약자 이름: "
                label-for="input-6"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-6"
                    v-model="form.booker_name"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-7"
                label="인원수: "
                label-for="input-7"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-7"
                    v-model="form.number_of_player"
                    disabled
                    style="text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-8"
                label="전화번호: "
                label-for="input-8"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-8"
                    v-model="form.phone_number"
                    disabled
                    style="text-align: center;"
                ></b-form-input>
                <hr style="width:100%; margin-top:5px;">
                </b-form-group>
                <b-form-group
                id="input-group-9"
                required
                label="예약 상태: "
                label-for="input-9"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-9"
                    v-model="form.status"
                    disabled
                    style="text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-button type="submit" variant="primary" class="p-2 mx-2"> 예약 수정 </b-button>
                <b-button type="reset" class="p-2 mx-2"> 초기화 </b-button>
                <b-button variant="success">탈출 완료</b-button>
                <b-button variant="danger"> no show </b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data(){
        return {
            form: {
                id: this.$route.params.id,
                title: this.$route.params.title,
                number_of_player: this.$route.params.number_of_player,
                booker_name: this.$route.params.booker_name,
                phone_number: this.$route.params.phone_number,
                status: this.$route.params.status,
                start_date: this.DBdatetimeToDateString(this.$route.params.start_time),
                start_time: this.DBdatetimeToTimeString(this.$route.params.start_time),
                reserved_time: this.DBdatetimeToString(this.$route.params.reserved_time),
            }
        }
    },
    methods:{
        DBdatetimeToString(tzString){
            const Days=['일', '월', '화', '수', '목', '금', '토'];
            let time = new Date(tzString.slice(0,-1));
            time.setHours(time.getHours()+9);
            return time.getFullYear()+"년 "+ (time.getMonth()+1)+"월 "+time.getDate()+"일 "+Days[time.getDay()]+"요일 "+((time.getHours()<10)?'0'+time.getHours():time.getHours())+":"+((time.getMinutes()<10)?'0'+time.getMinutes():time.getMinutes());
        },
        DBdatetimeToDateString(tzString){
            const Days=['일', '월', '화', '수', '목', '금', '토'];
            let time = new Date(tzString.slice(0,-1));
            time.setHours(time.getHours()+9);
            return time.getFullYear()+"년 "+ (time.getMonth()+1)+"월 "+time.getDate()+"일 "+Days[time.getDay()]+"요일 ";
        },
        DBdatetimeToTimeString(tzString){
            let time = new Date(tzString.slice(0,-1));
            time.setHours(time.getHours()+9);
            return ((time.getHours()<10)?'0'+time.getHours():time.getHours())+":"+((time.getMinutes()<10)?'0'+time.getMinutes():time.getMinutes());    
        },
        onSubmit(){

        },
        onReset(){

        }
    },
    mounted(){
        this.form.start_date = this.DBdatetimeToDateString(this.$route.params.start_time);
        this.start_time = this.DBdatetimeToTimeString(this.$route.params.start_time);
        this.reserved_time = this.DBdatetimeToString(this.$route.params.reserved_time);
    },
    computed: {
        ...mapGetters('branch', {
            branchName: 'getBranchName'
        })
    },
    created(){
        if(Object.keys(this.$route.params).length===0){
            alert('다시 접근해주세요.');
            this.$router.go(-1);
        }
        else{
            this.$store.dispatch('branch/fetch_branch_info');
        }
    }
}
</script>
