import validateSignup from '../../../client/validations/signup'

describe('validateSignup', () => {
  const createSignupInfo = (overrides) => {
    const info = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }

    return { ...info, ...overrides }
  }

  it('invalidates an email when left empty', (done) => {
    validateSignup(createSignupInfo())
      .catch((error) => {
        expect(error.response.data.message).toContain('Email is required')
        done()
      })
  })

  it('invalidates an email when not in proper format', (done) => {
    validateSignup(createSignupInfo({ email: 'test' }))
      .catch((error) => {
        expect(error.response.data.message).toContain('Email is invalid')
        done()
      })
  })

  it('invalidates a password when left empty', (done) => {
    validateSignup(createSignupInfo({ email: 'test@test.com' }))
      .catch((error) => {
        expect(error.response.data.message).toContain('Password is required')
        done()
      })
  })

  it('invalidates a passwordConfirmation when left empty', (done) => {
    validateSignup(createSignupInfo({ email: 'test@test.com', password: 'password' }))
      .catch((error) => {
        expect(error.response.data.message).toContain('Password confirmation is required')
        done()
      })
  })

  it('invalidates a passwordConfirmation when it doesnt match password', (done) => {
    validateSignup({ email: 'test@test.com', password: 'password', passwordConfirmation: 'passwords' })
      .catch((error) => {
        expect(error.response.data.message).toContain('Passwords must match')
        done()
      })
  })

  it('validates an email, password and passwordConfirmation', (done) => {
    validateSignup({ email: 'test@test.com', password: 'password', passwordConfirmation: 'password' })
      .then((response) => {
        expect(response.email).toContain('test@test.com')
        done()
      })
  })

})
