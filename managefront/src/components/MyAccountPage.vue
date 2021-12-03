<template>
    <div class="container">
        <header class="jumbotron">
            <h1>계정 정보</h1>
            <p>username: {{user.name}}</p>
            <p>지점: {{branch_info.name}}</p>
            <p>level: {{user.level}}</p>
        </header>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    created(){
        this.$store.dispatch('branch/fetch_branch_info');
    },
    computed: {
        ...mapState({
            user: state=> state.user.user,
        }),
        ...mapGetters('branch', {
            branch_info: 'getBranchInfo'
        })
    }
}
</script>