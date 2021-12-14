<template>
    <div id="theme_manage">
        <h1>{{branchName}} 테마 관리</h1>
        <hr/>
        <b-container>
            <b-row cols="3">
                <b-col v-for = "theme in themeList" :key=theme.id>
                    <b-card
                        :img-src="'/api/img/theme/?imgName='+theme.image_path"
                        img-alt="Image"
                        img-top
                        img-height="400"
                    >
                    <b-card-text>
                        <h3><b>{{theme.title}}</b></h3>
                    </b-card-text>
                    <b-card-text>
                        {{theme.content}}
                    </b-card-text>
                    <b-card-text>
                        장르 : &nbsp; {{ theme.genres }}
                    </b-card-text>
                    <b-card-text style="margin-top:-10px;">
                        문제구성 : &nbsp; 장치 {{ theme.device_importance }}%, 자물쇠 {{ get_lock_importance(theme.device_importance) }}%
                    </b-card-text>
                    <b-card-text style="margin-top:-10px;">
                        플레이시간 : &nbsp; {{ theme.length }}분
                    </b-card-text>
                    <b-card-text style="margin-top:-10px;">
                        <b-row>
                        <b-col>
                            난이도 : 
                        </b-col>
                        <b-col style="margin-left:-65px; margin-bottom:-20px;">
                            <b-form-rating v-model = "theme.difficulty" readonly no-border variant="warning" style="width:100px; margin-top:-9px;"></b-form-rating>
                        </b-col>
                        </b-row>
                    </b-card-text>
                    <b-card-text style="margin-top:-10px;">
                        권장인원 : &nbsp; {{ theme.recommended_number }}
                    </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {

        }
    },
    created() {
        this.$store.dispatch('theme/fetch_theme_list');
        this.$store.dispatch('branch/fetch_branch_info');
    },
    computed: {
        ...mapState({
            themeList: state => state.theme.themeList
        }),
        ...mapGetters('branch', {
            branchName: 'getBranchName'
        })
    },
    methods: {
        get_lock_importance(device_importance){
            return 100-device_importance;
        }
    }
}
</script>
