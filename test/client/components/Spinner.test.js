import React from 'react'
import { render } from 'react-testing-library'
import Spinner from '../../../client/components/Spinner'

describe('Spinner component', () => {

  const { getByTestId } = render(<Spinner />)

  it('renders properly', () => {
    expect(getByTestId('spinner')).toBeDefined()
  })

})


