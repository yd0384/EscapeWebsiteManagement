<template>
    <div id="app">
        <div v-if="logined">
            <ManageHeader></ManageHeader>
            <router-view class="logined view"></router-view>
        </div>
        <div v-else>
            <router-view class="login view" name="login"></router-view>
        </div>
    </div>
</template>

<script>
import ManageHeader from './components/ManageHeader.vue'
export default {
    name: 'App',
    components: { ManageHeader },
    data() {
        return { logined: false }
    },
    created(){
        this.$http.get("/api/auth/login")
        .then((res)=>{
            const user = res.data.user;
            if (user) {
                this.$store.commit("user/setUser", user);
                this.logined=true;
            }
            else {
                this.logined=false;
            }
        })
        .catch((err)=>{
            console.error(err);
        });
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>