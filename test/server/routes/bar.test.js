import server from '../../../server'
import db from '../../../server/db'
import request from 'supertest'


describe('Bar routes', () => {

  beforeAll((done) => { 
    db.connect()
      .then(() => { done() } )
  }) 
  afterAll((done) => { 
    db.disconnect()
      .then(() => { done() })
  })

  
  



  it('can get bars by location', (done) => {
   
    request(server)
      .post('/api/bars')
      .set('Connection', 'keep-alive')
      .send({location: 'Boston, MA'})
      .expect((response) => {
        
        expect(response.body.length).toBeGreaterThan(5)
      })
      .expect(200, done)
      
  })

  it('can add patrons', (done) => {
   
    request(server)
      .post('/api/bars/patron')
      .set('Connection', 'keep-alive')
      .send({ email: 'test@test.com', yelp_id: '2s4BPlsqvM4fV5F_MkF40g'})
      .expect((response) => {
        
        expect(response.body.patrons.length).toEqual(1)
      })
      .expect(200, done)
  })

  it('can remove patrons', (done) => {

    request(server)
      .post('/api/bars/patron/remove')
      .set('Connection', 'keep-alive')
      .send({ email: 'test@test.com', yelp_id: '2s4BPlsqvM4fV5F_MkF40g' })
      .expect((response) => {
     
        expect(response.body.patrons.length).toEqual(0)
        
      })
      .expect(200, done)
  })
})

