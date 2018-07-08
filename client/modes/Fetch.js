
class FetchMode {
  constructor(machine) {
    this.name = 'fetch'
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
    fetch = () => {
      this.machine.transition(this.machine.modes['fetching'])
    }
    render = (props) => {
      return this.machine.renderFetch(props)
 
    }
}

export default FetchMode