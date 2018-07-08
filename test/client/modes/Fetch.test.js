import FetchMode from '../../../client/modes/Fetch'

describe('Fetch mode', () => {


    
  let fetching, transition, renderFetch, enter, exit, fetchMode

  beforeEach(() => {
    fetching = 'fetching'
    transition = jest.fn()
    renderFetch = jest.fn()
    enter = jest.fn()
    exit = jest.fn()
   
    fetchMode = new FetchMode({
      transition,
      modes: { fetching },
      renderFetch
    })
  })


  it('has a name property', () => {
    expect(fetchMode.name).toContain('fetch')
  })

  it('has a fetch method that transitions to fetching mode', () => {
    fetchMode.fetch()

    expect(transition).toHaveBeenCalledTimes(1)
    expect(transition).toHaveBeenCalledWith('fetching')
  })

  it('has an onEnter method that takes a handler and points its enter to it', () => {
    fetchMode.onEnter(enter)
    expect(fetchMode.enter).toBe(enter)
  })

  it('has an onExit method that takes a handler and points its exit to it', () => {
    fetchMode.onExit(exit)
    expect(fetchMode.exit).toBe(exit)
  })

  it('has a render method that calls renderFetch with props', () => {
    fetchMode.render('render fetch')
    expect(renderFetch).toHaveBeenCalledTimes(1)
    expect(renderFetch).toHaveBeenCalledWith('render fetch')
  })

})