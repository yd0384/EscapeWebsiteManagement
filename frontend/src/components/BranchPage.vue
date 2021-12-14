<template>
    <div>
        <h1 style="margin-bottom:-5px;">Customer</h1>
        [지점정보]
        <div>
            <b-container>
              <b-row cols="2" style = "margin-top:50px">
                <b-col v-for="branch in branches" :key=branch.id>
                    <b-card
                        :img-src="'/api/img/branch/?imgName='+ branch.image_path"
                        img-alt="Image"
                        img-top
                        img-height="220"
                        tag="article"
                        class="mb-5"
                        align="left"
                        style="max-width:22rem; margin:auto;"
                    >
                    <b-card-text style="text-align:center;">
                        <h4> {{ branch.name }} </h4>
                    </b-card-text>
                    <b-card-text>
                        지점 전화번호 : {{ branch.tel_number }}
                    </b-card-text>
                    <b-card-text style="margin-top:-15px;">
                        지점 주소 : {{ branch.address }}
                    </b-card-text>
                    </b-card>
                </b-col>
              </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('theme', {
            theme_view: 'getThemeView'
        }),
        ...mapState({
            branches: state => state.theme.branches,
            themes: state => state.theme.themes,
        })
    }, 
    created () {
        this.$store.dispatch('theme/fetch_branches')  
    },
}
</script>