export class JudgeDirection {
  constructor() {
    this.lastState = null
    this.currentState = null
  }
  setState(val) {
    this.lastState = this.currentState
    this.currentState = val
  }
  get direction() {
    if (this.lastState === null) {
      return null
    }
    return this.currentState < this.lastState
  }
}
