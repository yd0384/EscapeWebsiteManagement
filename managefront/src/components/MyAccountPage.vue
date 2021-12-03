<template>
    <div class="container">
        <header class="jumbotron">
            <h1>계정 정보</h1>
            <p>username: {{user.name}}</p>
            <p>지점: {{user.branch_id}}</p>
            <p>level: {{user.level}}</p>
        </header>
    </div>
</template>

<script>
export default {
    created(){
        this.$http.get("/api/auth/login")
        .then((res)=>{
            const user = res.data.user;
            if (user) {
                this.$store.commit("setUser", user);
            }
            else {
                this.$router.push( {name: "HomePage" });
            }
        })
        .catch((err)=>{
            console.error(err);
        });
    },
    computed: {
        user() { return this.$store.getters.user; }
    }
}
</script>