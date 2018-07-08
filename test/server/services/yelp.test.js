import { _searchYelp } from '../../../server/services/yelp'

describe('Yelp Service', () => {
  it('searches the yelp api for bars by location', (done) => {
    const req = { body: { location: 'Boston, MA' } }
    const res = jest.mock 
    _searchYelp(req, res)
      .then(() => {
        expect(req.yelp_listings.length).toBeGreaterThan(5)
        done()
      })
   
  
  })
   

  it('throws an error if search fails', (done) => {
    const req = { body: { location: 'fdfajeiofajnvnavaerfc' } }
    const res = jest.mock
    _searchYelp(req, res)
      .catch(response => {
        expect(response.message).toContain('failed')
        done()
      })
  })
})