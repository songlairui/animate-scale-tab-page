<template>
    <div id="app">
        <component :is="curr"></component>
        <div class="dev-panel" v-transfer-dom>
            <label>
                <input type="radio" name="curr" v-model="curr" value="HelloWorld">HelloWorld
            </label>
            <label>
                <input type="radio" name="curr" v-model="curr" value="next">
                next
            </label>
        </div>
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Next from "./components/next.vue";

export default {
    name: "app",
    components: {
        HelloWorld,
        Next
    },
    data() {
        return {
            curr: "next"
        };
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
    border: medium solid rgb(255, 114, 114);
    background: lightpink;
    // -moz-outline-radius: 20px;
    overflow: hidden;
}
.dev-panel {
    position: fixed;
    left: 1em;
    top: 1em;
    width: 23em;
    height: 80vh;
    border: thin solid white;
    color: whitesmoke;
    line-height: 1.4em;
    padding: 0.3em;
}
</style>
