import React from 'react'
import { render, Simulate } from 'react-testing-library'
import SearchBar from '../../../client/components/SearchBar'

describe('SearchBar component', () => {

  const createFakeProps = (overrides) => {
    const props = {
      searchTerm: '',
      setSearchTerm: jest.fn(),
      search: jest.fn()
    }

    return { ...props, ...overrides }
  }
  
  const renderSearchBar = (props) => render(<SearchBar {...props} />)

  const changeValue = (value) => ({
    target: { value }
  })

  it('renders properly', () => {
    const props = createFakeProps()
    const { getByTestId, container } = renderSearchBar(props)
    expect(getByTestId('search-bar-title').textContent).toContain('Have Some Fun Tonight!')
    expect(getByTestId('search-bar-input')).toBeDefined()
    expect(container.querySelector('.search-icon')).toBeDefined()
  })

  it('has a text input that displays searchTerm as its value', () => {
    const props = createFakeProps({ searchTerm: 'test search term' })
    const { getByTestId } = renderSearchBar(props)
    expect(getByTestId('search-bar-input').value).toContain('test search term')
  })

  it('calls setSearchTerm when user types text into input', () => {
    const props = createFakeProps()
    const { getByTestId } = renderSearchBar(props)
    Simulate.change(getByTestId('search-bar-input'), changeValue('Boston, Ma'))
    expect(props.setSearchTerm).toHaveBeenCalledTimes(1)
    expect(props.setSearchTerm).toHaveBeenCalledWith('Boston, Ma')
  
  })

  it('calls search when user clicks on search icon', () => {
    const props = createFakeProps()
    const { container } = renderSearchBar(props)
    Simulate.click(container.querySelector('.search-icon'))
    expect(props.search).toHaveBeenCalledTimes(1)
  })

   


})