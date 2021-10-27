<template>
  <html>
    <body>
      <div id="app">
        <MainHeader></MainHeader>
        <!--<img src="./assets/logo.png">!-->
        <div class='main-content'>
        <router-view/>
        </div>
        <MainFooter></MainFooter>
      </div>
    </body>
  </html>
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
  min-height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.main-content {
  margin-bottom: 100px;
  padding: 50px;
  padding-top:10px;
}

</style>
