import React from 'react'
import { Simulate, render } from 'react-testing-library'
import Bars from '../../../client/components/Bars'

describe('Bars component', () => {

  const renderBars = (props) => render(
    <Bars {...props} render={
      (props) => <span data-testid={props.id} key={props.id}>{props.name}</span>
    } />
  )
  
  
  const fakeProps = {
    reset: jest.fn(),
    bars: [
      {
        id: 'one',
        name: 'BarOne'
      },
      {
        id: 'two',
        name: 'BarTwo'
      },
      {
        id: 'three',
        name: 'BarThree'
      }
    ],
 
  }
  
  const { getByText, getByTestId } = renderBars(fakeProps)
  
  it('renders children with bar info', () => {
    expect(getByTestId('bars').children.length).toEqual(3)
    expect(getByTestId('one').textContent).toContain('BarOne')
  })

  it('sets a new search when the search button is clicked', () => {
    Simulate.click(getByText('new search'))
    expect(fakeProps.reset).toHaveBeenCalledTimes(1)

  })
})