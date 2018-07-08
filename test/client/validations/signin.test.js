import validateSignin from '../../../client/validations/signin'

describe('validateSignin', () => {
  const createSigninInfo = (overrides) => {
    const info = {
      email: '',
      password: ''
    }

    return { ...info, ...overrides }
  }
    
  it('invalidates an email when left empty', (done) => {
    validateSignin(createSigninInfo())
      .catch((error) => {
        expect(error.response.data.message).toContain('Email is required')
        done()
      })
  })

  it('invalidates an email when not in proper format', (done) => {
    validateSignin(createSigninInfo({ email: 'test'}))
      .catch((error) => {
        expect(error.response.data.message).toContain('Email is invalid')
        done()
      })
  })

  it('invalidates a password when left empty', (done) => {
    validateSignin(createSigninInfo({ email: 'test@test.com' }))
      .catch((error) => {
        expect(error.response.data.message).toContain('Password is required')
        done()
      })
  })

  it('validates an email and password', (done) => {
    validateSignin({ email: 'test@test.com', password: 'password' })
      .then((response) => {
        expect(response.email).toContain('test@test.com')
        done()
      })
  })

})