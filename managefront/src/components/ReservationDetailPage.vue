<template>
    <div>
        <h1 style="margin-bottom:50px;">{{branchName}} 예약정보</h1>
        <hr/>
        <b-container style="width:35%; margin-bottom:150px;">
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
                    style="text-align: center;"
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
                    style="text-align: center;"
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
                    required
                    style="text-align: center;"
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
                    required
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
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
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
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px; margin-bottom:50px;">
                <b-button v-if="form.status=='플레이 이전'" type="submit" variant="primary" class="p-2 mx-2" style="width:100px;"> 예약 수정 </b-button>
                <b-button v-if="form.status=='플레이 완료'" variant="warning" class="p-2 mx-2" style="color:white; width:100px;"> 플레이 이전 </b-button>
                <b-button v-if="form.status=='플레이 이전'" variant="success" class="p-2 mx-2" style="width:100px;">탈출 완료</b-button>
                <b-button v-if="form.status=='플레이 이전'" variant="danger" class="p-2 mx-2" style="width:100px;"> no show </b-button>
                <b-button v-if="form.status=='노쇼'" variant="danger">확인 필요<b-icon icon="exclamation-triangle-fill" scale="1.5" variant="warning" style="margin-left:11px;"></b-icon></b-button>
                <b-button v-if="form.status=='노쇼'" variant="primary">확인 완료<b-icon icon="check-square" scale="1.5" variant="warning" style="margin-left:11px;"></b-icon></b-button>
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
