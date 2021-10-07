<template>
  <div>
    <h1>Theme</h1>
    <div>
      <b-list-group horizontal>
        <b-list-group-item v-for="branch in branches" :key=branch.branch_id v-on:click="select_branch(branch.branch_id)">
          {{ branch.branch_name }}
        </b-list-group-item>
      </b-list-group>
      <div v-if="themes">
        <b-card
          v-for="theme in themes" :key=theme.theme_id
          :title="theme.theme_name"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-left
          tag="article"
          class="mb-5"
          >
          <b-card-text>
            {{ theme.theme_detail }}
          </b-card-text>
          <router-link :to="{ name: 'ReservationPage', params: { branch_id: selected_branch }}"> <b-button variant="primary">예약하기</b-button></router-link>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$http.get('/api/theme')
      .then((res) => {
        this.branches = JSON.parse(res.data);
        this.selected_branch = this.branches[0].branch_id;
        this.$http.get('/api/theme/get_themes', {params: {
          branch_id : this.selected_branch
        }})
          .then((res) => {
            this.themes = JSON.parse(res.data);
            console.log(res.data);
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
    select_branch(id){
      this.selected_branch=id;
      this.$http.get('/api/theme/get_themes', {params: {
          branch_id : this.selected_branch
      }})
        .then((res) => {
          this.themes = JSON.parse(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }

  },
}
</script>

