<template>
    <div>
        <h4 style="margin-bottom:50px;">계정 추가</h4>
        <b-container style="width:35%">
            <b-form @submit="onSubmit">
                <b-form-group
                id="input-group-1"
                label="id: "
                label-for="input-1"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-1"
                    v-model="user_id"
                    required
                    style="background-color: #FFFFFF; text-align: center;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-2"
                label="지점: "
                label-for="input-2"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-2"
                    v-model="user_branch"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-form-group
                id="input-group-3"
                label="level: "
                label-for="input-3"
                label-cols="12" label-cols-sm="2"
                >
                <b-form-input
                    id="input-3"
                    v-model="user_level"
                    disabled
                    style="background-color: #FFFFFF; text-align: center; border: 0px;"
                ></b-form-input>
                </b-form-group>
                <hr style="width:100%; margin-top:5px;">
                <b-button type="submit" variant="primary" class="p-2 mx-2"> 계정등록 </b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user_id: '',
            user_branch: '강남점',
            user_level: 1,
        }
    }
}
</script>