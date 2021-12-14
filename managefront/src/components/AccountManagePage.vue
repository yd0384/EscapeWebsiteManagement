<template>
    <div>
        <h1>{{branch_name}} level 1 계정 관리</h1>
        <hr/>
        <b-form v-for="(user, id) in L1UserList" :key="id" inline @submit="onSubmit($event, user.id)" @reset="onReset($event, user.id)" style="justify-content:center; margin:50px;">
            <b-form-group
                id="input-group-1"
                label= "username: "
                label-for="input-1"
                style="margin-right:10px;"
            >
                <b-form-input
                    id="input-1"
                    readonly
                    inline
                    v-model="user.username"
                    style="margin-left:10px;"
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" style="margin-right:10px;">랜덤 비밀번호 재설정</b-button>
            <b-button type="reset" variant="danger">계정 제거</b-button>
            <b-alert :show="user.message">{{user.message}}</b-alert>     
        </b-form>
        <router-link :to="{name: 'AccountCreatePage'}">
            <b-button variant="info">계정 추가</b-button>
        </router-link>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            user: state=> state.user.user,
            L1UserList: state=> state.user.L1UserList
        }),
        ...mapGetters('branch', {
            branch_name: 'getBranchName'
        }),
    },
    created() {
        if(this.user.level != 2){
            this.$router.push({path: '/'});
        }
        else{
            this.$store.dispatch('branch/fetch_branch_info');
            this.$store.dispatch('user/fetch_l1_user_list');
        }
    },
    methods: {
        onSubmit: function(event, uid){
            event.preventDefault();
            this.$store.dispatch('user/issue_random_password', {uid: uid})
            .then(res=> {
                const result = res.data;
                if(result.success){
                    alert(result.message);
                }
                else{
                    alert("비밀번호 발급 실패");
                }
            })
            .catch(error=>{
                console.error(error);
            })
        },
        onReset: function(event, uid){
            event.preventDefault();
            this.$store.dispatch('user/delete_user', {uid: uid})
            .then(res=> {
                const result = res.data;
                if(result.success){
                    this.$store.dispatch('user/fetch_l1_user_list');
                }
                else{
                    alert("계정 삭제 실패");
                }
            })
            .catch(error=>{
                console.error(error);
            })
        },
        
    }
}
</script>
