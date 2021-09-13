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
                    v-model="id"
                    type="id"
                    placeholder="Enter id"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="text-password"
            >
                <b-form-input
                    id="text-password"
                    v-model="password"
                    type="password"
                    placeholder="Enter password"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Level:" label-for="input-2">
                <b-form-select
                id="input-2"
                v-model="level"
                :options="levels"
                required
                ></b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
                id: '',
                password: '',
                level: null,
                levels: [
                    {value: 'null', text: '레벨을 선택해주세요'},
                    {value: 1, text: 'Level 1'},
                    {value: 2, text: 'Level 2'},
                    {value: 3, text: 'Level 3'}
                ]
            };
        },
    methods: {
        onSubmit(event) {
            const id = this.id;
            const level =this.level;
            const password = this.password;
            if(level==null){
                alert("level을 선택해주세요");
            }
            else{
                this.$http.post("api/login", {id, level, password,}, {"Content-Type":"application-json"})
                    .then((res) => {
                        if(res.data.user) {
                            this.$store.commit("setUser", res.data.user);
                            this.$router.push({ name: "Home"});
                        }else if (res.data.message){
                            alert(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }
    }
}
</script>