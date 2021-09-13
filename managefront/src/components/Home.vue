<template>
  <div class="container">
    <header class="jumbotron">
      <h3>user id : {{user.id}}</h3>
      <h2>user level : {{user.level}}</h2>
      <h2 v-if="hasbranch">지점 : {{user.branch_id}}</h2>
    </header>
  </div>
</template>

<script>
export default {
  created(){
      this.$http.get("/api/login")
      .then((res)=>{
          const user = res.data.user;
          if (user) {
              this.$store.commit("setUser", user);
          }
          else {
              this.$router.push( {name: "LoginPage" });
          }
      })
      .catch((err)=>{
          console.error(err);
      });
  },
  computed: {
      user() { return this.$store.getters.user; }
  }}
</script>