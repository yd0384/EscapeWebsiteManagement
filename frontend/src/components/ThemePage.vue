<template>
  <div>
    <h1>Theme</h1>
    <div>
      <b-list-group horizontal>
        <b-list-group-item v-for="branch in branchs" :key=branch.id v-on:click="select_branch(branch.id)">
          {{ branch.name }}
          <b-badge variant="primary" pill>{{branch.themes.length}}</b-badge>
        </b-list-group-item>
      </b-list-group>
      <b-card
        v-for="theme in branchs[selected_branch].themes" :key=theme.id
        :title="theme.name"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-left
        tag="article"
        class="mb-5"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>
        <b-button href="#" variant="primary">예약하기</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data()  {
    return {
      selected_branch:0,
      branchs: [
        { 
          id: 0,
          name: '건대1호점' ,
          themes : [
            { 
              id: 0,
              name: '루시드드림',
            },
            {
              id: 1,
              name: '콜드케이스',
            }
          ]
        },
        { 
          id: 1,
          name: '건대2호점' ,
          themes : [
            { 
              id: 0,
              name: '디어마르시',
            }
          ]
        }
      ]
    }
  },
  methods:{
    select_branch(id){
      this.selected_branch=id;
    }
  }
}
</script>

