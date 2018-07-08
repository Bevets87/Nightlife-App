import React from 'react'
import { render, Simulate } from 'react-testing-library'
import IconButton from '../../../client/components/IconButton'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

describe('IconButton component', () => {
  
  const fakeProps = {
    onClick: jest.fn(),
    text: 'test-button',
    icon: faSearch,
    className: 'test-button'
  }
  const { getByText, container } = render(<IconButton {...fakeProps} />)

  it('renders properly', () => {
    expect(getByText('test-button')).toBeDefined()
    expect(getByText('test-button').className).toContain('test-button')
    expect(container.querySelector('svg')).toBeDefined()
  })

  it('calls onClick when clicked', () => {
    Simulate.click(getByText('test-button'))
    expect(fakeProps.onClick).toHaveBeenCalledTimes(1)
  })

})

