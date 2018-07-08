import server from '../../../server'
import db from '../../../server/db'
import request from 'supertest'
import { dropUsers } from '../helpers'


describe('User routes', () => {

  beforeAll((done) => {
    db.connect()
      .then(() => { done() })
  })
  afterAll((done) => {
    dropUsers(db.getConnection())
      .then(() => db.disconnect())
      .then(() => { done() })
  })






  it('can signup a user', (done) => {

    request(server)
      .post('/api/users')
      .set('Connection', 'keep-alive')
      .send({ email: 'test@test.com', password: 'password', passwordConfirmation: 'password' })
      .expect((response) => {
      
        expect(response.headers['x-auth-token'].length).toBeGreaterThan(10)
        expect(response.body).toContain('test')
      })
      .expect(200, done)

  })

  it('signin a user', (done) => {

    request(server)
      .post('/api/users/signin')
      .set('Connection', 'keep-alive')
      .send({ email: 'test@test.com', password: 'password' })
      .expect((response) => {
        expect(response.body).toContain('test')
      })
      .expect(200, done)
  })


})

