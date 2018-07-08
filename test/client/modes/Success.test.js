import SuccessMode from '../../../client/modes/Success'

describe('Success mode', () => {

  let fetch, enter, exit, transition, renderSuccess, successMode

  beforeEach(() => {
    fetch = 'fetch'
    enter = jest.fn()
    exit = jest.fn()
    transition = jest.fn()
    renderSuccess = jest.fn()

    
    successMode = new SuccessMode({
      transition,
      modes: { fetch },
      renderSuccess
    })
  })


  it('has a name property', () => {
    expect(successMode.name).toContain('success')
  })

  it('has an onEnter and onExit method that take a handler that enter and exit point to respectively', () => {
    successMode.onEnter(enter)
    successMode.onExit(exit)
    expect(successMode.enter).toBe(enter)
    expect(successMode.exit).toBe(exit)
  })

  it('has a reset method that transitions success mode to fetch mode', () => {
    successMode.reset()
    expect(transition).toHaveBeenCalledTimes(1)
    expect(transition).toHaveBeenCalledWith('fetch')
  })

  it('has a render method that delegates rendering to renderSuccess', () => {
    successMode.render('render success')
    expect(renderSuccess).toHaveBeenCalledTimes(1)
    expect(renderSuccess).toHaveBeenCalledWith('render success')
  })

})