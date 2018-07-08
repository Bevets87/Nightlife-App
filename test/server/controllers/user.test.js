import User from '../../../server/models/user'
import db from '../../../server/db'

import { insertUsers, dropUsers } from '../helpers'

import { 
  _isNewEmail, 
  _getByEmail, 
  _validatePassword, 
  _getById,
  _createOne
} from '../../../server/controllers/user'


describe('User Controllers', () => {
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
      { email: 'one@one.com', password: 'password' }
    ])
      .then(() => { done() })
  })
  afterEach((done) => {
    dropUsers(db.getConnection())
      .then(() => { done() })
  })


  it('validates a new email', (done) => {
    const req = { body: { email: 'three@three.com' } }
    const res = jest.mock
    _isNewEmail(req, res)
      .then((response) => {
        expect(response.message).toContain('new')
        done()
      })
  })

  it('invalidates an email that already exists', (done) => {
    const req = { body: { email: 'one@one.com' } }
    const res = jest.mock 
    _isNewEmail(req, res)
      .catch(err => {
        expect(err.message).toContain('exists')
        done()
      }) 
  })

  it('gets an existing user by email', (done) => {
    const req = { body: {email: 'one@one.com'}}
    const res = jest.mock 
    _getByEmail(req, res)
      .then(() => {
        expect(req.user.email).toContain('one')
        done()
      })
    
  })

  it('rejects when an email does not exist', (done) => {
    const req = { body: { email: 'testing@test.com' } }
    const res = jest.mock
    _getByEmail(req, res)
      .catch((err) => {
        expect(err.message).toContain('Invalid')
        done()
      })
  })

  it('validates a correct password', (done) => {

    User.findOne({ email: 'one@one.com' })
      .then((user) => {
        const req = {
          body: { password: 'password' },
          user: user
        }
        const res = jest.mock
        _validatePassword(req, res)
          .then(response => {
            expect(response.message).toContain('Valid')
            done()
          })

      })
  })

  it('rejects an incorrect password', (done) => {

    User.findOne({ email: 'one@one.com' })
      .then((user) => {
        const req = {
          body: { password: 'feafeafe' },
          user: user
        }
        const res = jest.mock
        _validatePassword(req, res)
          .catch(response => {
            expect(response.message).toContain('Invalid')
            done()
          })
      })
    
  })

  it('gets a user by id', (done) => {
    User.findOne({ email: 'one@one.com' })
      .then(user => {
        const req = { user }
        const res = jest.mock
        _getById(req, res)
          .then(response => {
            expect(req.user.email).toContain('one')
            done()
          })
      })
  
  })

  it('rejects getting a user by id when id is invalid', (done) => {
    const req = { user: { _id: 'dkfoahekvneafvea' } } 
    const res = jest.mock
    _getById(req, res)
      .catch(response => {
        expect(response.message).toContain('Invalid')
        done()
      })
  })

  it('can create a user from an email and password property', (done) => {
    const req = { body: { email: 'testTwo@test.com', password: '123456' }}
    const res = jest.mock 
    _createOne(req, res)
      .then(()=> {
        expect(req.user.email).toBe('testTwo@test.com')
        done()
      })
  })

  it('throws an error when a user cannot be created', (done) => {
    const req = { body: { email: 'ofjoeanvneena'} }
    const res = jest.mock 
    _createOne(req, res)
      .catch(response => {
        expect(response.message).toContain('Unable to create')
        done()
      })
  })




})