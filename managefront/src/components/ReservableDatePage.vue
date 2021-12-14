<template>
    <div class="container">
        <h1>현재 {{branch_name}} 예약가능 일수: {{branch_reservable_date}}일</h1>
        <hr/>
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="예약가능 일수 변경: "
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.reservable_date"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">변경</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data(){
        return{
            form: {
                reservable_date: ''
            },
        }
        
    },
    created(){
        this.$store.dispatch('branch/fetch_branch_info');  
    },
    watch:{
        'form.reservable_date' : function(val){
            const reg = /[ㄱ-ㅗ|ㅏ-ㅣ|가-힣|a-z|A-Z]/;
            if(reg.exec(val)!==null) this.form.reservable_date = val.replace(/[^0-9]/g,'');
        }
    },
    computed: {
        ...mapState({
            user: state=> state.user.user,
        }),
        ...mapGetters('branch', {
            branch_name: 'getBranchName',
            branch_reservable_date: 'getBranchReservableDate'
        })
    },
    methods: {
        onSubmit: function(event){
            event.preventDefault();
            this.$store.dispatch('branch/change_branch_reservable_date', {curr_rdate: this.branch_reservable_date, rdate: this.form.reservable_date, bid: this.user.branch_id});
            this.form.reservable_date='';
        }
    }
}
</script>