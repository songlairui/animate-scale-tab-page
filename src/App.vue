<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  }
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
html {
  background: mediumvioletred;
}
#app {
  margin: auto;
  width: 400px;
  height: 600px;
  padding: 0.3em 0.6em;
  border: medium solid rgb(255, 114, 114);
  background: lightpink;
  // -moz-outline-radius: 20px;
  overflow: hidden;
  border-radius: 20px;
}
</style>
