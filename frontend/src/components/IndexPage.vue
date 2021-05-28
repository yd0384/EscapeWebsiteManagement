<template>
    <div v-if="user">
        <h1>접속한 유저</h1>
        <p>아이디 : {{ user.id }}</p>
        <p>비밀번호 : {{ user.password }}</p>
        <p>이름 : {{ user.name }}</p>
        <a v-on:click="onClick">go to Todo</a>
    </div>    
</template>

<script>
export default {
    methods: {
        onClick() {
            this.$router.push({ name: "TodoPage" });
        }
    },
    created() {
        this.$http.get('/api/login')
            .then((res) => {
                const user = res.data.user;
                if (user) {
                    this.$store.commit("setUser", user);
            } else {
                    this.$router.push( { name: "LoginPage" });
                }
            })

            .catch((err) => {
                console.error(err);
            });
    },
    computed: {
        user() { return this.$store.getters.user; }
    }
}
</script>

<style></style>