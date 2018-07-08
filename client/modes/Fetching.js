class FetchingMode {
  constructor(machine) {
    this.name = 'fetching'
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
  fail = () => {
    this.machine.transition(this.machine.modes['failure'])

  }
  succeed = () => {
    this.machine.transition(this.machine.modes['success'])

  }
  render = (props) => {
    return this.machine.renderFetching(props)
  }

}

export default FetchingMode