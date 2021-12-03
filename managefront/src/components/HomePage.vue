<template>
    
</template>

<script>
import { mapState } from 'vuex';
export default {
    created(){
        this.$http.get("/api/auth/login")
        .then((res)=>{
            const user = res.data.user;
            if (user) {
                this.$store.commit("user/setUser", user);
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
         ...mapState({
            user: state=> state.user.user,
        })
    },
    methods: {
        logout(){
            this.$http.get('/api/auth/logout')
            .then(()=>{
                this.$store.commit("user/setUser", null);
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