import React from 'react'
import { string, func } from 'prop-types'
import createTree from '../../../client/utils/createTree'
import { render } from 'react-testing-library'

describe('createTree util function', () => {
  const First = (props) => <div>{props.render(props)}</div>
  First.propTypes = { render: func }
  const Second = (props) => <div>{props.render(props)}</div>
  Second.propTypes = { render: func }
  const Third = (props) => <div data-testid="result">{props.message}</div>
  Third.propTypes = { message: string }

  const Tree = createTree(First, Second, Third)

  const { getByTestId } = render(<Tree message="pass it down" />)

  it('renders a tree of components', () => {
    expect(getByTestId('result').textContent).toContain('pass it down')
  })

})