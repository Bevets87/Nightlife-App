import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import { render } from 'react-testing-library'
import { Router, Route, Switch } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import reducers from '../../client/reducers'
import { string } from 'prop-types'


export const renderWithRedux = (
  ui, 
  { 
    initialState, 
    store = applyMiddleware(reduxThunk)(createStore)(reducers, initialState) 
  } = {}
) => {
  return { ...render(<Provider store={store}>{ui}</Provider>), store }
}

export const renderWithRouter = (
  ui,
  {
    route = '/', 
    history = createMemoryHistory({ initialEntries: [route] }) 
  } = {}
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  }
}

export const renderWithReduxAndRouter = (
  ui,
  {
    initialState,
    store = applyMiddleware(reduxThunk)(createStore)(reducers, initialState) 
  } = {},
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }) 
  } = {}
) => {
  return { 
    ...render(<Provider store={store}><Router history={history}>{ui}</Router></Provider>), 
    store,
    history 
  }
}


export const withRoute = (Component) => {
  
  const RouteContainer = (props) => {
    return (
      <div>
        <Switch>
          <Route
            exact path={props.path}            
            render={(router) => <Component {...props} {...router} />}
          />
        </Switch>
      </div>
    )
  }

  RouteContainer.propTypes = {
    path: string
  }

  return RouteContainer
}




