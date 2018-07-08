import React from 'react'
import { render } from 'react-testing-library'
import NotFound from '../../../client/components/NotFound'

describe('NotFound component', () => {
  
  const { getByTestId } = render(<NotFound />) 
  
  it('renders properly', () => {
    expect(getByTestId('not-found-text').textContent).toContain('Page Not Found')
  })
})