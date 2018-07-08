import React from 'react'
import { Simulate } from 'react-testing-library'
import { renderWithRedux } from '../helpers'
import SearchBarContainer from '../../../client/containers/SearchBarContainer'


const setUpTest = () => {
  return renderWithRedux(<SearchBarContainer search={jest.fn()} />)
}

const onChangeValue = (value) => ({
  target: { value }
})

describe('SearchBarContainer', () => {




  it('dispatches setLocation() to redux store when input element is changed', () => {
    const { getByTestId, store } = setUpTest()
    Simulate.change(getByTestId('search-bar-input'), onChangeValue('Boston, MA'))

    expect(getByTestId('search-bar-input').value).toContain('Boston, MA')
    expect(store.getState().bars.location).toContain('Boston, MA')
  })


})