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
        return { 
            logined: false,
            user: null
        }
    },
    watch: {
        user: function(){
            this.checklogin();
        }
    },
    created(){
        this.initlogin();
    },
    methods: {
        initlogin: function() {
            this.$http.get("/api/auth/login")
            .then((res)=>{
                this.user = res.data.user;
                if (this.user) {
                    this.$store.commit("user/setUser", this.user);
                    this.logined=true;
                }
                else {
                    this.logined=false;
                    if(this.$router.currentRoute.path!='/'){
                        this.$router.push({ path: '/'});
                    }
                }
            })
            .catch((err)=>{
                console.error(err);
            });
        },
        checklogin: function(){
            if(this.user){
                this.logined=true;
            }
            else{
                this.logined=false;
            }
        }
    }
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