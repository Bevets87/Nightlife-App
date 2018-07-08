import React from 'react'
import { render } from 'react-testing-library'
import Video from '../../../client/components/Video'

describe('Video component', () => {

  const { getByTestId } = render(<Video />)

  it('renders properly', () => {
    expect(getByTestId('video')).toBeDefined()
  })

})

