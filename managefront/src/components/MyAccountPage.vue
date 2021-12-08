<template>
    <div class="container">
        <header class="jumbotron">
            <h1>계정 정보</h1>
            <p>username: {{user.name}}</p>
            <p>지점: {{branch_name}}</p>
            <p>level: {{user.level}}</p>
            <b-form @submit="onSubmit">
                <b-form-group
                    id="input-group-1"
                    label="현재 비밀번호: "
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.curr_password"
                        type="password"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-2"
                    label="변경할 비밀번호: "
                    label-for="input-2"
                >
                    <b-form-input
                        id="input-2"
                        v-model="form.new_password"
                        type="password"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-3"
                    label="변경할 비밀번호 확인: "
                    label-for="input-3"
                >
                    <b-form-input
                        id="input-3"
                        v-model="form.new_password_valid"
                        type="password"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">비밀번호 변경</b-button>
        </b-form>
        </header>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            form :{
                curr_password: '',
                new_password: '',
                new_password_valid: ''
            }
        }
    },
    created(){
        this.$store.dispatch('branch/fetch_branch_info');
    },
    computed: {
        ...mapState({
            user: state=> state.user.user,
        }),
        ...mapGetters('branch', {
            branch_name: 'getBranchName'
        })
    },
    methods: {
        onSubmit: async function(event){
            event.preventDefault();
            await this.$store.dispatch('user/change_user_password', {
                id: this.user.id,
                curr_password: this.form.curr_password,
                new_password: this.form.new_password,
                new_password_valid: this.form.new_password_valid
            });
        }
    }
}
</script>