<template>
    <div class="container">
        <header class="jumbotron">
            
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
                this.$router.go();
            }
        })
        .catch((err)=>{
            console.error(err);
        });
    },
    computed: {
        user() { return this.$store.getters.user; }
    },
    methods: {
        logout(){
            this.$http.get('/api/auth/logout')
            .then(()=>{
                this.$store.commit("setUser", null);
                this.$router.go();
            })
            .catch((err)=>{
                console.error(err);
            })
        },
        myAccount(){
            this.$router.push({name: "MyAccountPage"});
        }
    }
}
</script>