<template>
    <div>
        <h1 style="margin-bottom:50px;">{{branchName}} 신규예약</h1>
        <hr/>
        <b-container style="width:35%; margin-bottom:150px;">
            <b-form @submit="onSubmit($event)" @reset="onReset">
                <b-form-group
                    id="input-group-1"
                    label="예약일: "
                    label-for="input-1"
                    label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-1"
                    v-model="form.play_date"
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
                    v-model="form.start_time"
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
                    v-model="themeName"
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
                    v-model="form.booker_name"
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
                        v-model="form.firstphone"
                        :options="options"
                        value-field="item"
                        text-field="name"
                        style="background-color: #FFFFFF; text-align: center; width:100px;"
                        class="custom-control-inline"
                    ></b-form-select>
                    <b-form-input
                        id="input-6"
                        v-model="form.secondphone"
                        style="background-color: #FFFFFF; text-align: center; width:100px;"
                        class="custom-control-inline"
                    ></b-form-input>
                    <b-form-input
                        id="input-7"
                        v-model="form.thirdphone"
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
                        :options="number_of_player"
                        value-field="idx"
                        text-field="name"
                        style="text-align: center"
                        required
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
            form: {
                play_date: '',
                start_time: '',
                end_time: '',
                firstphone: '010',
                booker_name: '',
                secondphone: '',
                thirdphone: '',
                id: '',
            },
            themeName: '',
            Days: ['일', '월', '화', '수', '목', '금', '토'],
            number_of_player: [],
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
        onSubmit(event){
            event.preventDefault();
            this.form.number_of_player = this.idx;
            let st = this.get_hour_and_minute(this.form.start_time);
            let en = this.get_hour_and_minute(this.form.end_time);
            let play_date = new Date(this.form.play_date);
            let start_day = new Date(play_date);
            let end_day = new Date(play_date);
            let start_time=this.date_to_mysql(start_day.setHours(st[0],st[1]));
            let end_time=this.date_to_mysql(end_day.setHours(en[0],en[1]));
            let reserved_time = this.date_to_mysql(new Date());
            let payload = {
                theme_id: this.form.id,
                start_time: start_time,
                end_time: end_time,
                status: 0,
                reserved_time: reserved_time,
                number_of_player: this.idx,
                phone_number: this.form.firstphone+'-'+this.form.secondphone+'-'+this.form.thirdphone,
                booker_name: this.form.booker_name,
            };
            this.$store.dispatch('reservation/create_reservation', payload)
            .then(res=>{
                if(res.status===204){
                    alert("예약 완료");
                }
                this.$router.push({name: 'TodayReservationPage'});
            })
            .catch(error=>{
                cosole.error(error);
            })
        },
        onReset(){

        },
        date_to_mysql: function(d){
            let time = new Date(d)
            time.setHours(time.getHours()+9);
            return time.toISOString().slice(0,19).replace('T',' ');
        },
        get_hour_and_minute: function(s){
            var arr= s.split(':');
            for(var i in arr){
            arr[i]=Number(arr[i]);
            }
            return arr;
        },
    },
    mounted(){
        this.form.play_date = this.$route.params.play_date;
        this.form.start_time = this.$route.params.start_time;
        this.form.end_time = this.$route.params.end_time;
        this.form.id = this.$route.params.id;
        for(var i in this.themeInfo.cost){
            this.number_of_player.push({idx: this.themeInfo.cost[i].number_of_player, name: String(this.themeInfo.cost[i].number_of_player)+"명"});
        }
        this.idx = this.number_of_player[0].idx;
        this.themeName = this.themeInfo.title;
    },
    watch: {
        themeInfo: function(){
            this.number_of_player=[];
            for(var i in this.themeInfo.cost){
                this.number_of_player.push({idx: this.themeInfo.cost[i].number_of_player, name: String(this.themeInfo.cost[i].number_of_player)+"명"});
            }
            this.idx = this.number_of_player[0].idx;
            this.themeName = this.themeInfo.title;
            return this.themeInfo;
        }
    },
    computed: {
        ...mapGetters('branch', {
            branchName: 'getBranchName',   
        }),
        ...mapGetters('theme', {
            themeInfo: 'getThemeInfo',
        }),
    },
    created(){
        if(Object.keys(this.$route.params).length===0){
            alert('다시 접근해주세요.');
            this.$router.go(-1);
        }
        this.$store.dispatch('theme/fetch_theme_info', this.$route.params.id);
        this.$store.dispatch('branch/fetch_branch_info');
        
    }
}
</script>
