import infiniteScroll from 'vue-infinite-scroll'
import { JudgeDirection } from '@/utils/JudgeDirection'

import { map, debounce, merge } from 'rxjs/operators'
import { timer } from 'rxjs'

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
  domStreams: ['scroll$', 'touchmove$'],
  subscriptions() {
    const merged = this.touchmove$.pipe(merge(this.scroll$))
    let i = 0
    merged
      .pipe(
        debounce(() => {
          i++
          if (i < 3) {
            return []
          }
          return timer(30)
        }),
        map(({ event }) => {
          if (i > 3) {
            i = 0
          }
          if (event.type === 'touchmove') {
            const { clientY } = event.touches[0]
            return clientY
          } else if (event.type === 'scroll') {
            return -event.target.scrollTop
          }
        })
      )
      .subscribe((e) => {
        this.judge(e)
      })
  },
  render() {
    const on = touchable
      ? {
          wheel: this.wheel
        }
      : {}
    const directives = touchable
      ? [
          {
            name: 'infinite-scroll',
            value: this.load
          },
          {
            name: 'stream',
            value: this.touchmove$,
            arg: 'touchmove',
            expression: 'touchmove$'
          }
        ]
      : [
          {
            name: 'infinite-scroll',
            value: this.load
          },
          {
            name: 'stream',
            value: this.scroll$,
            arg: 'scroll'
          }
        ]

    return (
      <div
        class="scroll-area"
        class="scroller"
        infinite-scroll-disabled={this.loading}
        infinite-scroll-distance="10"
        style={{ overflow: 'auto' }}
        {...{ on }}
        {...{ directives }}
      >
        {this.ddd$}~ {this.loading} ~{this.$slots.default}
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
      if (currentState === null) {
        return
      }
      if (this.direction !== currentState) {
        this.$emit('update:direction', currentState)
      }
    },
    load() {
      this.$emit('load')
    }
  }
}
