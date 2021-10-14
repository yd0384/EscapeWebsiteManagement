<template>
  <div>
    <h1>Theme</h1>
    <div>
      <b-list-group horizontal>
        <b-list-group-item :class="{'active' : isSelected(branch.id) }" v-for="branch in branches" :key=branch.id v-on:click="select_branch(branch.id)">
          {{ branch.name }}
        </b-list-group-item>
      </b-list-group>
      <div v-if="themes">
        <b-card
          v-for="theme in themes" :key=theme.id
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
          <router-link :to="{ name: 'ReservationPage', params: { branch_id: selected_branch }}"> <b-button variant="primary">예약하기</b-button></router-link>
        </b-card>
      </div>
    </div>
  </div>
</template>
<style scoped>
  
</style>
<script>
export default {
  created() {
    this.$http.get('/api/theme')
      .then((res) => {
        this.branches = JSON.parse(res.data);
        this.selected_branch = this.branches[0].id;
        this.$http.get('/api/theme/get_themes', {params: {
          branch_id : this.selected_branch
        }})
          .then((res) => {
            this.themes = JSON.parse(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  data()  {
    return {
      branches: [],
      themes: [],
      selected_branch: 0,
    }
  },
  methods:{
    isSelected: function(i) {
      return i === this.selected_branch;
    },
    select_branch(id){
      this.selected_branch=id;
      this.$http.get('/api/theme/get_themes', {params: {
          branch_id : this.selected_branch
      }})
        .then((res) => {
          this.themes = JSON.parse(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

  },
}
</script>

