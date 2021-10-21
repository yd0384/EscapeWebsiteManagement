<template>
  <div>
    <h1>Theme</h1>
    <div>
      <b-list-group horizontal>
        <b-list-group-item :class="{'active' : isSelected(branch.id) }" v-for="branch in branches" :key=branch.id v-on:click="select_branch(branch.id)">
          {{ branch.name }}
        </b-list-group-item>
      </b-list-group>
      <div v-if="theme_view">
        <b-card
          v-for="theme in theme_view" :key=theme.id
          :title="theme.title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-left
          tag="article"
          class="mb-5"
          >
          <b-card-text>
            {{ theme.content }}
          </b-card-text>
          <b-card-text>
            장르 : {{ theme.genres }}
          </b-card-text>
          <b-card-text>
            문제구성 : 장치 {{ theme.device_importance }}%, 자물쇠 {{ get_lock_importance(theme.device_importance) }}%
          </b-card-text>
          <b-card-text>
            테마길이 : {{ theme.length }}분
          </b-card-text>
          <b-card-text>
            난이도 : <b-form-rating v-model = "theme.difficulty" readonly show-value></b-form-rating>
          </b-card-text>
         
          <router-link :to="{ name: 'ReservationPage', params: { branch_id: selected_branch }}"> <b-button variant="primary">예약하기</b-button></router-link>
        </b-card>
      </div>
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
    selected_branch: state => state.theme.selected_branch,
    })
  }, 
  created () {
    this.$store.dispatch('theme/fetch_branches'),
    this.$store.dispatch('theme/fetch_themes')  
  },
  methods:{
    isSelected: function(i) {
      return i === this.selected_branch;
    },
    select_branch: function(id){      
      this.$store.commit('theme/select_branch', id);
    },
    get_lock_importance(device_importance){
      return 100-device_importance;
    },
  }
}
</script>