import React from 'react'
import { render, Simulate } from 'react-testing-library'
import Patrons from '../../../client/components/Patrons'

describe('Patrons component', () => {

  const renderPatrons = (props) => render(<Patrons {...props} />)
  
  const fakeProps = {
    bar: 'The Test Bar',
    patrons: {
      'test1@test.com': 1,
      'test2@test.com': 1
    },
    hide: jest.fn()
  }

  const { getByTestId, getByText } = render(<Patrons {...fakeProps} />)

  it('renders properly', () => {
    expect(getByTestId('patron-bar').textContent).toContain('The Test Bar')
    expect(getByTestId('patrons').children.length).toEqual(2)
    expect(getByTestId('patron-email-1').textContent).toContain('test2@test.com')
  })


  it('calls the hide method when the exit icon is clicked', () => {
    Simulate.click(getByText('exit'))
    expect(fakeProps.hide).toHaveBeenCalledTimes(1)
  })

})