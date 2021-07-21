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
                    v-model="form.id"
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
                    v-model="form.password"
                    type="password"
                    placeholder="Enter password"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Level:" label-for="input-2">
                <b-form-select
                id="input-2"
                v-model="form.level"
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
            form: {
                id: '',
                password: '',
                level: null
            },
            levels: [{text: 'Select One', value: null}, 'Level1', 'Level2', 'Level3'],
            show: true
        }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        }
    }
}
</script>