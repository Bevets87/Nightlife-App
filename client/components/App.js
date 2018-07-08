import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import HeaderContainer from '../containers/HeaderContainer'
import Video from './Video'
import NotFound from './NotFound'
import DynamicImportContainer from '../containers/DynamicImportContainer'

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer/>
        <Video />
        <Switch>
          <Route 
            exact path="/" 
            component={(props) => 
              <DynamicImportContainer
                {...props}
                import={import('../containers/FetchMachineContainer')}  
              /> } 
          />
          <Route 
            exact path="/signin" 
            component={(props) => 
              <DynamicImportContainer 
                {...props} 
                import={import('../containers/SigninContainer')} 
              /> } 
          />
          <Route 
            exact path="/signup" 
            component={(props) => 
              <DynamicImportContainer 
                {...props} 
                import={import('../containers/SignupContainer')} 
              /> } 
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}



let ExportedApp = App

if (process.env.NODE_ENV === 'development') {
  const { hot } = require('react-hot-loader')
  ExportedApp = hot(module)(App)
}

export default ExportedApp 
