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
      <pre>MetaHeight: {{ metaHeight }} -</pre>
      <pre>contentOffset: {{ contentOffset }} -</pre>
      <button @click="toggle">Change Collapse</button>
      <div class="collapseable-area">
        <div class="metas" ref="metas">
          <div class="metas-bg" :style="metasBgStyle"></div>
          <div
            class="meta"
            v-for="(__, idx) in tabs"
            :class="{cur: subCur === idx}"
            @click="subCur = idx"
          >
            <div class="meta-bg" :style="metasBgStyle" v-if="subCur === idx"></div>
            <div class="extra" :style="extraStyle">{{ tabWidth[idx] }}</div>
            <div
              class="title"
              :style="metaItemStyle"
            >{{ idx.toLocaleString('zh-Hans-CN-u-nu-hanidec') }}</div>
          </div>
        </div>
      </div>
      <div class="scroll-area" :style="scrollStyle"></div>
      <div class="safe-area">安全留白区域</div>
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
      subCur: 1,
      collapse: false,
      tabHeight: 0,
      tabWidth: [],
      metaHeight: 0,
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
    },
    extraStyle() {
      return this.collapse ? { transform: `translateY(-50%) scaleY(0)` } : {};
    },
    metaItemStyle() {
      return this.collapse ? { transform: `translateY(-70%) scale(1.4)` } : {};
    },
    metasBgStyle() {
      return this.collapse ? { transform: `translateY(-10%) scaleY(0.8)` } : {};
    },
    scrollOffset() {
      if (this.collapse || this.currentIdx < 0) {
        return -this.metaHeight * 0.2;
      }
      return 0;
    },
    scrollStyle() {
      return {
        transform: `translateY(${this.scrollOffset}px)`
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
    this.$nextTick(() => {
      console.info("this", this.$refs.tabs);
      this.tabHeight = this.$refs.tabs.offsetHeight;
      this.metaHeight = this.$refs.metas.offsetHeight;

      this.tabWidth = this.$refs.tab.map(el => el.offsetWidth);
    });
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
    height: 40px;
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
  display: flex;
  flex-direction: column;
  .scroll-area {
    background: rgba(255, 255, 255, 0.4);
    flex: 1;
  }
}
.collapseable-area {
  padding: 3px 1em;
  .metas {
    display: flex;
    justify-content: space-evenly;
    height: 44px;
    .meta {
      text-align: center;
      width: 16%;
      z-index: 10;
      color: darkgray;
      div {
        position: relative;
        z-index: 10;
      }
      .meta-bg {
        position: absolute;
        z-index: 1;
      }
      &.cur {
        color: #fff;
      }
    }
  }
  .metas,
  .meta {
    position: relative;
    &-bg {
      z-index: 1;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      border-radius: 0.3em;
    }
  }
  .meta-bg {
    background: rgb(153, 97, 209);
  }
}
</style>
