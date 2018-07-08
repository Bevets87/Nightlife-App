import User from '../../../server/models/user'
import { _hasToken, _validateToken } from '../../../server/middleware/auth'
import db from '../../../server/db'
import { dropUsers, insertUsers } from '../helpers'


describe.only('Auth Middleware', () => {
  
  beforeAll((done) => {
    db.connect()
      .then(() => done())
  })
  afterAll((done) => {
    db.disconnect()
      .then(() => done())

  })
  beforeEach((done) => {
    insertUsers(db.getConnection())([
      { email: 'test@test.com', password: 'password' }
    ])
      .then(() => { done() })
  })
  afterEach((done) => {
    dropUsers(db.getConnection())
      .then(() => { done() })
  })
 
  

  it('verifies that a token exists on the header', () => {
    const req = { headers: { authorization: 'feoajvinaeneaf' } }
    const res = jest.mock
    _hasToken(req, res)
      .then(response => {
        expect(req.token).toContain('feoaj')
      })
  })

  it('rejects when a token does not exist', () => {
    const req = { headers: { authorization: null } }
    const res = jest.mock 
    _hasToken(req, res)
      .catch(response => {
        expect(response.message).toContain('No token present')
      })
  })

  it('validates a token', (done) => {
    User.findOne({ email: 'test@test.com'})
      .then((user) => {
        const req = { token: user.generateAuthToken() } 

        const res = jest.mock
        _validateToken(req, res)
          .then(response => {
            expect(response.message).toContain('Valid')
            done()
          })
      })
 
  })
  
  it('rejects when a token is not valid', (done) => {
    const req = { token: 'sJIDWHivwbBDHWUUHUWH' } 
    const res = jest.mock 
    _validateToken(req, res)
      .catch(response => {
        expect(response.message).toContain('Invalid')
        done()
      })
  })
})