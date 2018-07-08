import React from 'react'
import { string, func } from 'prop-types'
import withMode from '../../../client/hocs/withMode'
import { Simulate } from 'react-testing-library'
import { renderWithRedux } from '../helpers'

const ModeView = (props) => {
  return (
    <div>
      <h1 data-testid='mode-name'>{props.mode}</h1>
      <button onClick={() => { props.setMode('fetching') }}>Set Mode</button>
    </div>
  )
}

ModeView.propTypes = {
  mode: string,
  setMode: func
}

const ModeContainer = withMode(ModeView)

describe('withMode higher order component', () => {
    
  let testUtils

  beforeEach(() => {
    testUtils = renderWithRedux(<ModeContainer />)
  })

  

  it('renders a connected component with a mode prop', () => {
    const { getByTestId, getByText } = testUtils 
    expect(getByTestId('mode-name').textContent).toContain('fetch')
    
  })

  it('can dispatch setMode() when Set Mode button is clicked', () => {
    const { getByText, getByTestId, store } = testUtils
    Simulate.click(getByText('Set Mode'))
    expect(getByTestId('mode-name').textContent).toContain('fetching')
  })



})