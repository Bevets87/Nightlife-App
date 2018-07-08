import createBarApi from '../../../client/utils/createBarApi'
import tokenApi from '../../../client/utils/tokenApi'

describe('createBarApi util function', () => {
  let fetchImpl, mockBarApi
  beforeEach(() => {
    tokenApi.setToken('tokenstring')
    fetchImpl = {
      post: jest.fn(() => Promise.resolve())
    }
    mockBarApi = createBarApi(fetchImpl)
  })

  it('has a fetchBars method that calls fetchImpl.get() with location', (done) => {
    const location = 'Boston Ma'

    mockBarApi.fetchBars(location)
      .then(() => {
        expect(fetchImpl.post).toHaveBeenCalledTimes(1)
        expect(fetchImpl.post).toHaveBeenCalledWith('/api/bars', 'Boston Ma')
        done()
      })
   
  })

  it('has a protected addPatron method that requires a token and calls fetchImpl.post() with patron', (done) => {
    const patron = { email: 'test@test.com', yelp_id: 'one' }
    mockBarApi.addPatron(patron)
      .then(() => {
        
        expect(fetchImpl.post).toHaveBeenCalledTimes(1)
        expect(fetchImpl.post).toHaveBeenCalledWith('/api/bars/patron', patron, { headers: { authorization: tokenApi.getToken() } })
        done()
      })
    

  })

  it('has a protected removePatron method that requires a token and calls fetchImpl.post() with patron', (done) => {
    const patron = { email: 'test@test.com', yelp_id: 'two' }
    
    mockBarApi.removePatron(patron)
      .then(() => {
        expect(fetchImpl.post).toHaveBeenCalledTimes(1)
        expect(fetchImpl.post).toHaveBeenCalledWith('/api/bars/patron/remove', patron, { headers: { authorization: tokenApi.getToken() } })
        done()
      })
  })
})
