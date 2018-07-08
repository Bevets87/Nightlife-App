import FetchingMode from '../../../client/modes/Fetching'

describe('Fetching mode', () => {
 
  let success, failure, renderFetching, transition, enter, exit, fetchingMode

  beforeEach(() => {
    success = 'success'
    failure = 'failure'
    renderFetching = jest.fn()
    transition = jest.fn()
    enter = jest.fn()
    exit = jest.fn()
   
    fetchingMode = new FetchingMode({
      transition,
      modes: { success, failure },
      renderFetching
    })
  })


  it('has a name property', () => {
    expect(fetchingMode.name).toContain('fetching')
  })

  it('has an onExit and onEnter method that point handlers to exit and enter', () => {
    fetchingMode.onEnter(enter)
    fetchingMode.onExit(exit)
    expect(fetchingMode.enter).toBe(enter)
    expect(fetchingMode.exit).toBe(exit)
  })

  it('has a render method that delegates to renderFetching', () => {
    fetchingMode.render('render fetching')
    expect(renderFetching).toHaveBeenCalledTimes(1)
    expect(renderFetching).toHaveBeenCalledWith('render fetching')
  })

  it('has a succeed method that calls transition with success mode', () => {
    fetchingMode.succeed()
    expect(transition).toHaveBeenCalledTimes(1)
    expect(transition).toHaveBeenCalledWith('success')
  })

  it('has a fail method that calls transition with failure mode', () => {
    fetchingMode.fail()
    expect(transition).toHaveBeenCalledTimes(1)
    expect(transition).toHaveBeenCalledWith('failure')
  })


})