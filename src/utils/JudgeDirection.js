export class JudgeDirection {
  constructor() {
    this.lastState = 0
    this.currentState = 0
  }
  setState(val) {
    this.lastState = this.currentState
    this.currentState = val
  }
  get direction() {
    return this.currentState < this.lastState
  }
}
