<template>
    <div>
        <h1 style="margin-bottom:50px;">{{branchName}} 신규예약</h1>
        <hr/>
        <b-container style="width:35%; margin-bottom:150px;">
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                    id="input-group-1"
                    label="예약일: "
                    label-for="input-1"
                    label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-1"
                    v-model="play_date"
                    style="text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-2"
                label="예약시간: "
                label-for="input-2"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-2"
                    v-model="start_time"
                    style="text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                    id="input-group-3"
                    label="테마명: "
                    label-for="input-3"
                    label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-3"
                    v-model="theme_name"
                    required
                    style="text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                    id="input-group-4"
                    label="예약자 이름: "
                    label-for="input-4"
                    label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-4"
                    v-model="booker_name"
                    required
                    style="text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                    id="input-group-5"
                    label="전화번호: "
                    label-for="input-5"
                    label-cols="12" label-cols-sm="2"
                    >
                    <b-form-select
                        id="input-5"
                        v-model="firstphone"
                        :options="options"
                        value-field="item"
                        text-field="name"
                        style="background-color: #FFFFFF; text-align: center; width:100px;"
                        class="custom-control-inline"
                    ></b-form-select>
                    <b-form-input
                        id="input-6"
                        v-model="secondphone"
                        :state="validate_secondphone"
                        style="background-color: #FFFFFF; text-align: center; width:100px;"
                        class="custom-control-inline"
                    ></b-form-input>
                    <b-form-input
                        id="input-7"
                        v-model="thirdphone"
                        :state="validate_thirdphone"
                        style="background-color: #FFFFFF; text-align: center; width:100px;"
                        class="custom-control-inline"
                    ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                    id="input-group-8"
                    required
                    label="인원: "
                    label-for="input-8"
                    label-cols="12" label-cols-sm="2"
                    >
                    <b-form-select
                        id="input-8"
                        v-model="idx"
                        :options="headcounts"
                        value-field="idx"
                        text-field="name"
                        required
                        style="text-align: center"
                    ></b-form-select>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-button type="submit" variant="primary" class="p-2 mx-2" style="width:100px;"> 예약등록 </b-button>
                <b-button type="reset" class="p-2 mx-2" style="width:100px;"> 초기화 </b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data(){
        return {
            booker_name: '',
            secondphone: '',
            thirdphone: '',
            Days: ['일', '월', '화', '수', '목', '금', '토'],
            firstphone: '010',
            idx: 0,
            options: [
            { item: '010', name: '010' },
            { item: '011', name: '011' },
            { item: '016', name: '016' },
            { item: '017', name: '017' },
            { item: '018', name: '018' },
            { item: '019', name: '019' }
            ],
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
        /*if(Object.keys(this.$route.params).length===0){
            alert('다시 접근해주세요.');
            this.$router.go(-1);
        }
        else{
            this.$store.dispatch('branch/fetch_branch_info');
        }*/
    }
}
</script>
