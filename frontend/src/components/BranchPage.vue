<template>
    <div>
        <h1 style="margin-bottom:-5px;">Theme</h1>
        [지점정보]
        <div>
            <b-container>
            <b-row cols="2">
                <b-col v-for="branch in branches" :key=branch.id>
                    
                    <h2> {{ branch.name }} </h2>
                    <h3> 지점 전화번호 : {{ branch.tel_number }} </h3>
                    <h3> 지점 주소 : {{ branch.address }} </h3>
                    <b-img :src="require(`@/assets/branch/${ branch.image_path }`)" fluid alt="Responsive image" style="width:300px; height:250px; margin-bottom:50px"></b-img>
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