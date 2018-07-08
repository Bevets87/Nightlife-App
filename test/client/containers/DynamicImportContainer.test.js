import React from 'react'
import { render, wait } from 'react-testing-library'
import DynamicImportContainer from '../../../client/containers/DynamicImportContainer'

const MockImportedComponent = (props) => <div data-testid='imported-component'></div>

const importMock = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ default: MockImportedComponent })
  }, 1000)
})

const renderDynamicImportContainer = () => {
  return render(<DynamicImportContainer import={importMock()} />)
}

describe('DynamicImportContainer', () => {

  it('renders a Spinner on initial mount and then imports() an Imported Component', (done) => {
    const { getByTestId, queryByTestId } = renderDynamicImportContainer()
    expect(getByTestId('spinner')).toBeDefined()
    wait(() => expect(queryByTestId('spinner')).toBeNull())
      .then(() => {
        expect(getByTestId('imported-component')).toBeDefined()
        done()
      })
  })


    
})