import bcrypt from 'bcrypt'
import User from '../../../server/models/user'
import db from '../../../server/db'
import { dropUsers, insertUsers } from '../helpers'

describe('User Model', () => {

  beforeAll((done) => {
    db.connect()
      .then(() => { done() })
  })

  afterAll((done) => {
    db.disconnect()
      .then(() => { done() })
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
  

  it('can generate an auth token from a user instance', (done) => {
    User.findOne({ email: 'test@test.com' })
      .then((user) => {
        const token = user.generateAuthToken()
        expect(token.length).toBeGreaterThan(15)
        done()
      })
 
  })

  it('can generate a hash from a user instance', (done) => {
    
    User.findOne({ email: 'test@test.com' })
      .then((user) => {
        user.hashPassword('password')
          .then(hash => {
            expect(hash.slice(0, 6)).toEqual(user.password.slice(0, 6))
            done()
          })
      }) 
    
  })
  
  it('can validate a password on a user instance', (done) => {
    User.findOne({ email: 'test@test.com' })
      .then((user) => {
        user.checkPassword('password')
          .then(isValid => {
            expect(isValid).toBe(true)
            done()
          })
      })
  })

  it('has a toJSON method that returns an email prop', (done) => {
    User.findOne({ email: 'test@test.com' })
      .then((user) => {
        const userData = user.toJSON()
        expect(userData.email).toContain('test')
        done()
      })
  })

})