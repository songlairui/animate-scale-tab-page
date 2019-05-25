import infiniteScroll from 'vue-infinite-scroll'
import { JudgeDirection } from '@/utils/JudgeDirection'

const JUDGE = new JudgeDirection()
const touchable =
  typeof window === 'undefined' ? false : 'ontouchstart' in window

export default {
  name: 'ScrollArea',
  directives: { infiniteScroll },
  props: {
    direction: null,
    loading: null
  },
  render() {
    const { touchmove, scroll, wheel } = this
    const on = touchable ? { touchmove, wheel } : { scroll }
    return (
      <div
        class="scroll-area"
        class="scroller"
        v-infinite-scroll={this.load}
        infinite-scroll-disabled={this.loading}
        infinite-scroll-distance="10"
        {...{ on }}
        style={{ overflow: 'auto' }}
      >
        ~ {this.loading} ~{this.$slots.default}
      </div>
    )
  },
  methods: {
    wheel(e) {
      const { wheelDeltaY } = e
      const currentState = wheelDeltaY < 0
      if (this.direction !== currentState) {
        this.$emit('update:direction', currentState)
      }
    },
    touchmove(e) {
      const { clientY } = e.touches[0]
      this.judge(clientY)
    },
    scroll(e) {
      this.judge(e.target.scrollTop)
    },
    judge(val) {
      JUDGE.setState(val)
      const currentState = JUDGE.direction
      if (this.direction !== currentState) {
        this.$emit('update:direction', currentState)
      }
    },
    load() {
      this.$emit('load')
    }
  }
}
