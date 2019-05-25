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
  transition: all 0.3s;
  padding: 0;
  margin: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  display: flex;
}
html {
  background: mediumvioletred;
}
#app {
  margin: auto;
  width: 400px;
  height: 600px;
  border: medium solid rgb(255, 114, 114);
  background: lightpink;
  // -moz-outline-radius: 20px;
  overflow: hidden;
  border-radius: 20px;
}
</style>
