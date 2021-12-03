<template>
    <div>
        <h2>Log In</h2>
        <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="ID:"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.username"
                    type="text"
                    placeholder="Enter username"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="text-password"
            >
                <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Enter password"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        };
    },
    created(){
        this.$http.get("/api/auth/login")
        .then((res)=>{
            const user = res.data.user;
            if (user) {
                this.$store.commit("user/setUser", user);
            }
        })
        .catch((err)=>{
            console.error(err);
        });
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            const payload = {username: this.form.username, 'password': this.form.password};
            this.$http.post("/api/auth/login", payload)
                .then((res)=>{
                    if(res.data.user){
                        this.$store.commit("user/setUser", res.data.user);
                        this.$router.go();
                    }else if(res.data.message){
                        alert(res.data.message);
                    }
                })
                .catch((error)=>{
                    console.error(error);
                });
        }
    }
}
</script>