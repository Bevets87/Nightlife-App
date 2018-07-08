import FailureMode from '../../../client/modes/Failure'

describe('Failure mode', () => {
  let fetch, transition, renderFailure, enter, exit, failureMode



  beforeEach(() => {
        
    fetch = 'fetch'
    transition = jest.fn()
    renderFailure = jest.fn()
    enter = jest.fn()
    exit = jest.fn()
  
        
    failureMode = new FailureMode({
      transition,
      modes: { fetch },
      renderFailure
    })
    
  })



  it('has a name property', () => {
    expect(failureMode.name).toContain('failure')
  })

  it('has a render method that delegates rendering to renderFailure', () => {
    failureMode.render('render failure')
    expect(renderFailure).toHaveBeenCalledTimes(1)
    expect(renderFailure).toHaveBeenCalledWith('render failure')
  })

  it('has an onExit and onEnter that take a handler and point it to exit and enter respectively', () => {
    failureMode.onEnter(enter)
    failureMode.onExit(exit)
    expect(failureMode.enter).toBe(enter)
    expect(failureMode.exit).toBe(exit)
  })

  it('has a reset method that calls transition with fetch mode', () => {
    failureMode.reset()
    expect(transition).toHaveBeenCalledTimes(1)
    expect(transition).toHaveBeenCalledWith('fetch')
  })



})