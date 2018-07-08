import validate from '../../../server/middleware/validate'
import { _signinSchema } from '../../../server/controllers/user'



describe('Validate Middleware', () => {
  it('can validate', (done) => {
    const req = { body: { email: 'test@test.com', password: '1234456' } }
    const res = jest.mock
    validate(_signinSchema)('body')(req, res)
      .then(response => {
     
        expect(response.message).toContain('Valid')
        done()
      })
    
  })

  it('can invalidate', (done) => {
    const req = { body: { name: 'test@test.com', password: '1234456' } }
    const res = jest.mock
    validate(_signinSchema)('body')(req, res)
      .catch(response => {
        expect(response.message).toContain('email')
        done()
      })
  })

 
})