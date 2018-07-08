import React from 'react'
import { Simulate, render } from 'react-testing-library'
import Bar from '../../../client/components/Bar'

describe('Bar component', () => {

  
  
  const renderBar = (props) => render(
    <Bar 
      {...props} 
      render={
        (props) =>
          <div className='patrons'>
            {Object.keys(props.patrons).map((email, index) => <span key={index} data-testid={`patron-${index}`}>{email}</span>)}
          </div>
      }
    />
  )
  const fakePatrons = {
    'test1@test.com': 1, 
    'test2@test.com': 1
  }

  const fakeProps = {
    id: 'one',
    name: 'Bar One',
    going: 2,
    rating: 4,
    image_url: 'test-image-url',
    addPatron: jest.fn(),
    removePatron: jest.fn(),
    patrons: fakePatrons,
    render: jest.fn(),
  }

  const isNotGoing = () => jest.fn((patronsHash) => patronsHash['test3@test.com'])
  const isGoing = () => jest.fn((patronsHash) => patronsHash['test1@test.com'])
  const hasAuth = () => jest.fn((cb) => (...args) => { cb(...args) })
  const hasNoAuth = () => jest.fn((cb) => (...args) => { })

  

  it('renders bar info with no patrons', () => {
    const props = { ...fakeProps, requireAuth: hasNoAuth(), isGoing: isNotGoing() }
    const { getByText, getByTestId, container } = renderBar(props)
    expect(getByTestId('bar-image').getAttribute('src')).toContain('test-image-url')
    expect(getByTestId('bar-name').textContent).toContain('Bar One')
    expect(getByTestId('bar-rating').textContent).toContain('4')
    expect(getByTestId('bar-going').textContent).toContain('2')
    expect(container.querySelector('.patrons')).toBeNull()
    
    
  })
  it('renders patrons when an auth user clicks Going', () => {
    const props = { ...fakeProps, requireAuth: hasAuth(), isGoing: isNotGoing() }
    const { getByText, getByTestId, container } = renderBar(props)
    Simulate.click(getByText('Going'))
    expect(container.querySelector('.patrons')).toBeDefined()
    expect(getByTestId('patron-0').textContent).toContain('test1@test.com')
    
  })

  it('renders the addPatron button when user isnt going', () => {
    const props = {...fakeProps, requireAuth: hasNoAuth(), isGoing: isNotGoing() }
    const { getByText, getByTestId } = renderBar(props)
    expect(getByText('Go')).toBeDefined()
  
  })

  it('does not call addPatron when unauth user clicks Go', () => {
    const props = { ...fakeProps, requireAuth: hasNoAuth(), isGoing: isNotGoing() }
    const { getByText } = renderBar(props)
    Simulate.click(getByText('Go'))
     
    expect(props.requireAuth).toHaveBeenCalled()
    expect(props.addPatron).toHaveBeenCalledTimes(0)
  })

  it('calls addPatron with bar id when auth user clicks go', () => {
    const props = { ...fakeProps, requireAuth: hasAuth(), isGoing: isNotGoing() }
    const { getByText } = renderBar(props)
    Simulate.click(getByText('Go'))
    expect(props.requireAuth).toHaveBeenCalled()
    expect(props.addPatron).toHaveBeenCalledTimes(1)
  })

  it('renders the removePatron button when user is going', () => {
    const props = { ...fakeProps, requireAuth: hasAuth(), isGoing: isGoing() }
    const { getByText, getByTestId } = renderBar(props)
    expect(getByText('Leave')).toBeDefined()
  
    
  })

  it('calls removePatron with bar id when auth user clicks Leave', () => {
    const props =  { ...fakeProps, requireAuth: hasAuth(), isGoing: isGoing() }
    const { getByText } = renderBar(props)
    Simulate.click(getByText('Leave'))
    expect(props.removePatron).toHaveBeenCalledTimes(1)
    expect(props.removePatron).toHaveBeenCalledWith('one')
  })

  
})