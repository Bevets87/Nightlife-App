import React from 'react'
import { render, wait } from 'react-testing-library'
import withDynamicImport from '../../../client/hocs/withDynamicImport'

const LoadingComponent = (props) => <div><span data-testid='component-name'>Loading Component</span></div>
const ImportedComponent = (props) => <div><span data-testid='component-name'>Imported Component</span></div>
const importMock = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ default: ImportedComponent })
  }, 1000)
})

const DynamicImport = withDynamicImport(LoadingComponent)

const renderDynamicImport = () => render(<DynamicImport import={importMock()} />)

describe('withDynamicImport', () => {


  it('renders a Loading Component on initial mount and then imports() an Imported Component', (done) => {
    const { getByTestId, queryByText } = renderDynamicImport()
    expect(getByTestId('component-name').textContent).toContain('Loading Component')
    wait(() => expect(queryByText('Loading Component')).toBeNull() )
      .then(() => {
        expect(getByTestId('component-name').textContent).toContain('Imported Component')
        done()
      })
  })
})