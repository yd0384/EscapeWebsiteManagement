<template>
  <div id="app">
    <!--<img src="./assets/logo.png">!-->
    <MainHeader></MainHeader>
    <nav class='main-content'>
    <router-view/>
    </nav>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'

export default {
  name: 'App',
  components: {
    MainHeader, MainFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
