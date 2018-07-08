import React, { Component } from 'react'


const createTree = (...Components) => {
  const Root = Components.reverse().reduce((Last, Prev) => {
    const Component = (props) => {
      return <Prev {...props} render={(props) => <Last {...props} />} />
    }
   
    return Component
  })

  class Tree extends Component {
    render() {
      return <Root {...this.props} />
    }
  }

  return Tree


}

export default createTree