class SuccessMode {
  constructor(machine) {
    this.name = 'success'
    this.machine = machine
    this.enter = null
    this.exit = null
  }
    onEnter = (fn) => {
      this.enter = fn
    }
    onExit = (fn) => {
      this.exit = fn
    }
    reset = () => {
      this.machine.transition(this.machine.modes['fetch'])
    }
    render = (props) => {
      return this.machine.renderSuccess(props)
    }
}

export default SuccessMode