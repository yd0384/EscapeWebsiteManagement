<template>
    <div>
        <h1 style="margin-bottom:50px;">{{branchName}} level1 계정 추가</h1>
        <hr/>
        <b-container style="width:35%">
            <b-form @submit="onSubmit">
                <b-form-group
                id="input-group-1"
                label="username: "
                label-for="input-1"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-1"
                    v-model="form.username"
                    required
                    style="background-color: #FFFFFF; text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-2"
                label="지점: "
                label-for="input-2"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-2"
                    v-model="branchName"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-3"
                label="name: "
                label-for="input-3"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-3"
                    v-model="form.name"
                    required
                    style="background-color: #FFFFFF; text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-button type="submit" variant="primary" class="p-2 mx-2"> 계정등록 </b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data(){
        return{
            form: {
                username: '',
                name: '',
            }
        }
    },
    created() {
        this.$store.dispatch('branch/fetch_branch_info');
    },
    mounted() {
        if(this.user.level!=2){
            alert("페이지 접근 권한이 없습니다.");
            this.$router.push({path: "/"});
        }
    },
    computed: {
        ...mapState({
            user: state=> state.user.user,
        }),
        ...mapGetters('branch', {
            branchName: 'getBranchName'
        })
    },
    methods: {
        onSubmit(event){
            event.preventDefault();
            const payload = {
                username: this.form.username,
                branch_id: this.user.branch_id,
                name: this.form.name,
            }
            this.$store.dispatch('user/create_l1_user', payload)
            .then(res=> {
                alert('새로운 계정의 password는 '+res.data.password+'입니다.');
                this.onReset(event);
            })
            .catch(error=>{
                if(error.response.status===400){
                    alert(error.response.data.message);
                    this.onReset(event);
                }
                else{
                    console.error(error);
                }
                
            })
        },
        onReset(event){
            event.preventDefault();
            this.form.username = '';
            this.form.name = '';
        }
    }
}
</script>