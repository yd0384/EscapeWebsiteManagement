<template>
    <div id="theme_detail">
        <h1>{{branchName}} 테마 정보</h1>
        <hr/>
        <b-container>
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                    id="input-group-1"
                    label="테마 제목: "
                    label-for="input-1"
                    label-cols="12"
                    label-cols-sm="2"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.title"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    id="input-group-2"
                    label="테마 설명: "
                    label-for="textarea-2"
                    label-cols="12"
                    label-cols-sm="2"
                >
                    <b-form-textarea
                        id="textarea-2"
                        v-model="form.content"
                        rows="5"
                        max-rows="10"
                        required
                    ></b-form-textarea>
                </b-form-group>
                <b-form-group
                    id="input-group-3"
                    label="테마 장르: "
                    label-for="tags-3"
                    label-cols="12"
                    label-cols-sm="2"
                >
                    <b-form-tags
                        input-id="tags-3"
                        v-model="form.genres"
                        placeholder="장르를 입력해주세요."
                        required
                    ></b-form-tags>
                </b-form-group>
                <b-form-group
                    id="input-group-4"
                    label="문제 구성: "
                    label-for="input-4"
                    label-cols="12"
                    label-cols-sm="2"
                >
                    <b-row>
                        <b-col>
                            장치:
                        </b-col>
                        <b-col sm="2"> 
                            <b-form-input
                                id="input-4"
                                v-model="form.device_importance"
                                required
                            ></b-form-input>
                        </b-col>
                        <b-col>
                            %
                        </b-col>
                        <b-col cols="8">
                            자물쇠: {{get_lock_importance(form.device_importance)}}%
                        </b-col>
                    </b-row>
                </b-form-group>
                <b-form-group
                    id="input-group-5"
                    label="난이도: "
                    label-for="star-5"
                    label-cols="12"
                    label-cols-sm="2"
                >
                    <b-form-rating v-model="form.difficulty" variant="warning" required class="mb-2">
                    </b-form-rating>
                </b-form-group>
                <b-form-group
                    id="input-group-6"
                    label="테마 이미지: "
                    label-for="file-6"
                    label-cols="12"
                    label-cols-sm="2"
                >   
                    
                    <b-form-file
                        name="img"
                        accept="image/jpeg, image/png, image/gif"
                        id="file-6"
                        v-model="image"
                        :state="Boolean(image)"
                        placeholder="이미지 파일을 선택하세요."
                        no-drop
                        @change="previewImage"
                    ></b-form-file>
                    <b-img v-if="!Boolean(image)" :src="'/api/img/theme/?imgName='+themeInfo.image_path" height="400"></b-img>
                    <b-img v-if="Boolean(image)" :src="previewImageData" height="400"></b-img>
                </b-form-group>
                <b-form-group
                    id="input-group-7"
                    label="시간 제한: "
                    label-for="input-7"
                    label-cols="12"
                    label-cols-sm="2"
                >
                    <b-input-group append="분" >
                        <b-form-input
                            id="input-7"
                            v-model="form.length"
                            required
                            @change="onChange"
                        ></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group
                    id="input-group-8"
                    label="인원/가격: "
                    label-for="input-8"
                    label-cols="12"
                    label-cols-sm="2"
                >
                    <b-icon icon="plus-circle" aria-hidden="true" v-if="addbottom" @click="addBottom"></b-icon>
                    <b-icon icon="dash-circle" aria-hidden="true" v-if="removebottom" @click="removeBottom"></b-icon>
                    <b-row v-for="cost in form.cost" :key=cost.number_of_player>
                        <b-col>
                            {{cost.number_of_player}} 명: 
                        </b-col>
                        <b-col>
                            <b-form-input
                            id="input-8"
                            v-model="cost.price"
                            required
                            ></b-form-input>
                        </b-col>
                    </b-row>
                    <b-icon icon="plus-circle" aria-hidden="true" v-if="addtop" @click="addTop"></b-icon>
                    <b-icon icon="dash-circle" aria-hidden="true" v-if="removetop" @click="removeTop"></b-icon>
                </b-form-group>
                <b-form-group
                    id="input-group-9"
                    label="운영 시간: "
                    label-for="input-9"
                    label-cols="12"
                    label-cols-sm="2"
                >
                    <strong>테마 시작시간을 순서대로 ex) 09:20 형태로 입력해주세요.</strong>
                    <b-row
                        v-for="time_table in form.time_table"
                        :key=time_table.id
                    >
                        <b-col>
                            <b-form-input
                                id="input-9"
                                v-model="time_table.start_time"
                                required
                                @change="onChange"
                            ></b-form-input>
                        </b-col>
                        <b-col>
                            ~
                        </b-col>
                        <b-col>
                            <b-form-input
                                id="input-9-1"
                                v-model="time_table.end_time"
                                disabled
                            ></b-form-input>
                        </b-col>
                    </b-row>
                    <b-icon icon="plus-circle" aria-hidden="true" @click="addTime"></b-icon>
                    <b-icon icon="dash-circle" aria-hidden="true" v-if="removetime" @click="removeTime"></b-icon>
                </b-form-group>
                <b-form-group
                    id="input-group-10"
                    label="테마 활성화 여부: "
                    label-for="switch-10"
                    label-cols="12"
                    label-cols-sm="2"
                >
                    <b-form-checkbox
                        id="switch-10"
                        v-model="form.active"
                        switch
                    ></b-form-checkbox>
                </b-form-group>
                <b-button variant="primary" type="submit">테마 수정</b-button> <b-button variant="danger" @click="deleteTheme">테마 삭제</b-button>
            </b-form>
        </b-container>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            form: {
                id: -1,
                title: '',
                content: '',
                genres: [],
                device_importance: 0,
                difficulty: 0,
                image_path: '',
                length: 0,
                cost: [],
                time_table: [],
                active: true,
            },
            image: null,
            formData: new FormData(),
            time_tables: 1,
            previewImageData: null,
            top: 0,
            bottom: 0,
            addtop: true,
            addbottom: true,
            removetop: true,
            removebottom: true,
            removetime: true
        }
    },
    created() {
        if(!this.$route.params.tid){
            alert('테마를 선택해주세요.');
            this.$router.go(-1);
        }
        this.$store.dispatch('branch/fetch_branch_info');
        this.$store.dispatch('theme/fetch_theme_info', this.$route.params.tid);
    },
    watch: {
        'themeInfo.id': function(){
            if(this.themeInfo.id === this.$route.params.tid){
                this.form.id=this.themeInfo.id;
                this.form.title = this.themeInfo.title;
                this.form.content = this.themeInfo.content;
                this.form.genres = this.themeInfo.genres;
                this.form.device_importance = this.themeInfo.device_importance;
                this.form.difficulty = this.themeInfo.difficulty;
                this.form.length = this.themeInfo.length;
                this.form.cost = this.themeInfo.cost;
                this.form.time_table = this.themeInfo.time_table;
                this.time_tables = this.form.time_table.length;
                if(this.time_tables===0){
                    this.form.time_table.push({id: 1, start_time: ''});
                    this.removetime=false;
                }
                this.form.active = (this.themeInfo.active===1)?true:false;
                for(var i in this.form.cost){
                    this.top = Math.max(this.form.cost[i].number_of_player, this.top);
                    if(this.bottom===0){
                        this.bottom=this.form.cost[i].number_of_player;
                    }
                    else{
                        this.bottom = Math.min(this.form.cost[i].number_of_player, this.bottom);
                    }
                }
                if(this.top===this.bottom){
                    this.removetop=false;
                    this.removebottom=false;
                }
                if(this.bottom<1){
                    this.addbottom=false;
                }
                this.$forceUpdate();
            }
        }
    },
    mounted() {
        if(this.themeInfo.id === this.$route.params.tid){
            this.form.id=this.themeInfo.id;
            this.form.title = this.themeInfo.title;
            this.form.content = this.themeInfo.content;
            this.form.genres = this.themeInfo.genres;
            this.form.device_importance = this.themeInfo.device_importance;
            this.form.difficulty = this.themeInfo.difficulty;
            this.form.length = this.themeInfo.length;
            this.form.cost = this.themeInfo.cost;
            this.form.time_table = this.themeInfo.time_table;
            this.time_tables = this.form.time_table.length;
            if(this.time_tables===0){
                this.form.time_table.push({id: 1, start_time: ''});
                this.removetime=false;
            }
            this.form.active = (this.themeInfo.active===1)?true:false;
            for(var i in this.form.cost){
                this.top = Math.max(this.form.cost[i].number_of_player, this.top);
                if(this.bottom===0){
                        this.bottom=this.form.cost[i].number_of_player;
                    }
                else{
                    this.bottom = Math.min(this.form.cost[i].number_of_player, this.bottom);
                }
            }
            if(this.top===this.bottom){
                this.removetop=false;
                this.removebottom=false;
            }
            if(this.bottom<1){
                this.addbottom=false;
            }
            this.$forceUpdate();
        }

    },
    computed: {
        ...mapState({
            themeInfo: state=>state.theme.themeInfo
        }),
        ...mapGetters('branch', {
            branchName: 'getBranchName'
        })
    },
    methods: {
        onChange(event){
            const exp = new RegExp('^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
            var time = new Date();
            for(var i in this.form.time_table){
                if(exp.test(this.form.time_table[i].start_time)){
                    var hh = Number(this.form.time_table[i].start_time.split(':')[0]);
                    var mm = Number(this.form.time_table[i].start_time.split(':')[1]);
                    time.setHours(hh, mm + Number(this.form.length));
                    this.form.time_table[i].end_time=((time.getHours()<10)?'0'+time.getHours():time.getHours())+":"+((time.getMinutes()<10)?'0'+time.getMinutes():time.getMinutes())
                }
            }
            this.$forceUpdate();
        },
        get_lock_importance(device_importance){
            return 100-device_importance;
        },
        onSubmit(event){
            event.preventDefault();
            if(this.image){
                this.changeThemeImage(event)
                .then(res=>{
                    if(res.status===200){
                        this.form.image_path=res.data.img_path;
                        this.$store.dispatch("theme/update_theme", this.form)
                        .then(res=>{
                            if(res.status===200){
                                alert("테마 수정 완료");
                                this.$router.push({name: 'ThemeManagePage'});
                            }
                            else{
                                alert("테마 수정 실패");
                                this.$router.push({name: 'ThemeManagePage'});
                            }
                        })
                        .catch(error=>{
                            console.error(error);
                        })
                    }
                })
                .catch(error=>{
                    console.error(error);
                })
            }
            else{
                this.form.image_path = this.themeInfo.image_path;
                this.$store.dispatch("theme/update_theme", this.form)
                .then(res=>{
                    if(res.status===200){
                        alert("테마 변경 완료");
                        this.$router.push({name: 'ThemeManagePage'});
                    }
                    else{
                        alert("테마 생성 실패");
                        this.$router.push({name: 'ThemeManagePage'});
                    }
                })
                .catch(error=>{
                    console.error(error);
                })
            }
        },
        onReset(event){

        },
        deleteTheme(event){
            this.$store.dispatch("theme/delete_theme", this.form.id)
            .then(res=>{
                if(res.status===200){
                    alert("테마 삭제 완료");
                    this.$router.push({name: 'ThemeManagePage'});
                }
                else{
                    alert("테마 생성 실패");
                    this.$router.push({name: 'ThemeManagePage'});
                }
            })
            .catch(error=>{
                console.error(error);
            })
        },
        previewImage(event){
            var input = event.target;
            if(input.files && input.files[0]){
                var reader = new FileReader();
                reader.onload = e=> {
                    this.previewImageData = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
                this.formData.delete('img');
                this.formData.append('img', input.files[0]);
            }else{
                this.previewImageData = null;
            }
        },
        changeThemeImage(event){
            return this.$http.post('/api/img/changeThemeImage?imageName='+this.themeInfo.image_path, this.formData);
        },
        addTop(){
            this.top+=1;
            this.form.cost.push({number_of_player: this.top, price: 0});
            if(!this.removetop){
                this.removetop=true;
            }
            if(!this.removebottom){
                this.removebottom=true;
            }
        },
        addBottom(){
            this.bottom-=1;
            this.form.cost.unshift({number_of_player: this.bottom, price: 0});
            if(this.bottom===1){
                this.addbottom=false;
            }
            if(!this.removetop){
                this.removetop=true;
            }
            if(!this.removebottom){
                this.removebottom=true;
            }
        },
        removeTop(){
            this.top-=1;
            this.form.cost.pop();
            if(this.top===this.bottom){
                this.removetop=false;
                this.removebottom=false;
            }
        },
        removeBottom(){
            this.bottom+=1;
            this.form.cost.shift();
            if(this.top===this.bottom){
                this.removetop=false;
                this.removebottom=false;
            }
            if(!this.addbottom){
                this.addbottom=true;
            }
        },
        addTime(){
            this.time_tables+=1;
            this.form.time_table.push({id: this.time_tables, start_time: ''});
            if(!this.removetime){
                this.removetime=true;
            }
        },
        removeTime(){
            this.time_tables-=1;
            this.form.time_table.pop();
            if(this.time_tables===1){
                this.removetime=false;
            }
        },
    }
}
</script>