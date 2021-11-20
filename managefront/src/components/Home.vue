<template>
  <div class="container">
    <header class="jumbotron">
      <h3>username : {{user}}</h3>
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