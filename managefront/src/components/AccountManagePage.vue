<template>
    <div>
        <h1>{{branch_name}} level 1 계정 관리</h1>
        <b-form v-for="user in L1UserList" :key="user.id" inline @submit="onSubmit(user.id)" @reset="onReset(user.id)">
            <b-form-group
                id="input-group-1"
                label= "username: "
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    readonly
                    inline
                    v-model="user.username"
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">랜덤 비밀번호 재설정</b-button>
            <b-button type="reset" variant="danger">계정 제거</b-button>
        </b-form>
        <b-button variant="info">계정 추가</b-button>
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
        })
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
            this.$store.dispatch()
        },
        onReset: function(event, uid){
            event.preventDefault();

        }
    }
}
</script>
