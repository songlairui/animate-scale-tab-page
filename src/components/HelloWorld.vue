<template>
  <div class="wrapper">
    <div class="tabs" ref="tabs">
      <div class="bg-mark" :style="markStyle"></div>
      <div
        ref="tab"
        class="tab"
        @click="current = item"
        :class="{active: item === current}"
        v-for="(item, idx) in tabs"
        :style="tabStyle(idx)"
        :key="item"
      >{{item}}</div>
    </div>
    <div class="tab-content" :style="contentStyle">
      <pre>Collapse: {{ collapse }}</pre>
      <pre>TabHeight: {{ tabHeight }} -</pre>
      <pre>TabWidth: {{ tabWidth }} -</pre>
      <pre>contentOffset: {{ contentOffset }} -</pre>
      <button @click="toggle">Change Collapse</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  data() {
    return {
      tabs: ["白", "日依", "尽, 黄", "河入海流", "欲穷千里目"],
      current: "白",
      collapse: false,
      tabHeight: 10,
      tabWidth: [],
      scale: 1.5
    };
  },
  computed: {
    expanded() {
      return this.collapse && this.tabs.includes(this.current);
    },
    currentIdx() {
      return this.tabs.indexOf(this.current);
    },
    originOffset() {
      return ((this.scale - 1) / 2) * 100;
    },
    contentOffset() {
      if (this.collapse || this.currentIdx < 0) {
        return 0;
      }
      return this.tabHeight * (this.scale - 1);
    },
    contentStyle() {
      return {
        transform: `translateY(${this.contentOffset}px)`
      };
    },
    markStyle() {
      const { tabHeight, collapse } = this;
      const left = this.tabWidth
        .slice(0, this.currentIdx)
        .reduce((a, b) => a + b, 0);
      const width = this.tabWidth[this.currentIdx];
      const scale = collapse ? 1 : this.scale;
      return {
        left: `${left}px`,
        top: `${"0"}px`,
        width: `${width * scale}px`,
        height: `${tabHeight * scale}px`
      };
    }
  },
  methods: {
    toggle() {
      this.collapse = !this.collapse;
    },
    tabStyle(idx) {
      if (this.collapse) {
        return {};
      }
      const { currentIdx, tabHeight, contentOffset } = this;
      const toOffsetY = contentOffset / 2;
      if (idx < currentIdx) {
        return {
          transform: `translateY(${toOffsetY}px)`
        };
      }
      const { originOffset } = this;
      if (currentIdx === idx) {
        return {
          transform: `translate(${originOffset}%, ${originOffset}%) scale(${
            this.scale
          })`
        };
      }
      if (idx > currentIdx) {
        const width = this.tabWidth[currentIdx];
        const toOffset = width * (this.scale - 1);
        return {
          transform: `translate(${toOffset}px, ${toOffsetY}px)`
        };
      }
    }
  },
  mounted() {
    console.info("this", this.$refs.tabs);
    this.tabHeight = this.$refs.tabs.offsetHeight;
    this.tabWidth = this.$refs.tab.map(el => el.offsetWidth);
  }
};
</script>

<style lang='less'>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tabs {
  display: flex;
  position: relative;
  .bg-mark {
    position: absolute;
    z-index: 1;
    min-width: 10px;
    height: 100%;
    background: rgb(153, 97, 209);
    border-radius: 5px;
    top: 0;
    left: 0;
  }
  .tab {
    z-index: 10;
    cursor: pointer;
    padding: 0.5em;
    // border: thin solid yellow;
    &.active {
      color: #fff;
      // background: red;
      // transform: translate(25%, 25%) scale(1.5);
    }
  }
}
.tab-content {
  flex: 1;
  border: thin solid blue;
}
</style>
