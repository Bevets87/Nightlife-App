import React from 'react'
import { render, Simulate } from 'react-testing-library'
import Error from '../../../client/components/Error'

describe('Error component', () => {

  const renderError = (props) => render(<Error {...props} />)

  const fakeProps = {
    clear: jest.fn(),
    error: { message: 'There is an error' }
  }

  const { getByTestId, getByText } = renderError(fakeProps)

  it('renders a proper error component', () => {
    expect(getByTestId('error-message').textContent).toContain('There is an error')
  })

  it('clears an error when the Ok button is clicked', () => {
    Simulate.click(getByText('Ok'))
    expect(fakeProps.clear).toHaveBeenCalledTimes(1)
  })
})