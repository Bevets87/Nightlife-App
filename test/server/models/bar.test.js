import Bar from '../../../server/models/bar'
import db from '../../../server/db'
import { insertBars, dropBars } from '../helpers'

describe('Bar Model', () => {

  beforeAll((done) => {
    db.connect()
      .then(() => { done() })
    
  })

  afterAll((done) => {
    db.disconnect()
      .then(() => { done() })
  })
  beforeEach((done) => {
    insertBars(db.getConnection())([
      { yelp_id: 'one', patrons: [{ email: 'one@one.com' }] },
      { yelp_id: 'two', patrons: [{ email: 'one@one.com' }, { email: 'two@two.com' }] },
      { yelp_id: 'three', patrons: [{ email: 'three@three.com' }] },
      { yelp_id: 'four', patrons: [{ email: 'four@four.com' }]  },
      { yelp_id: 'five', patrons: [] },
      { yelp_id: 'six', patrons: [{ email: 'five@five.com' }] }
    ])
      .then(() => { done() })
  })
  afterEach((done) => {
    dropBars(db.getConnection())
      .then(() => { done() })
  })

  it('inserts six bars', (done) => {
    Bar.find({})
      .then(bars => {
        expect(bars.length).toEqual(6)
        done()
      })
  })
  it('finds bars by an array of yelp_ids', (done) => {
    Bar.findAllByYelpIds([ 'one', 'three', 'six'])
      .then(bars => {
       
        expect(bars.length).toEqual(3)
        done()

      })

  })




  it('can add a patron to a bar that does exist', (done) => {
    Bar.addPatron({ yelp_id: 'one', email: 'two@two.com'})
      .then(() => Bar.findOne({ yelp_id: 'one'}))
      .then((bar) => {
        expect(bar.patrons.length).toEqual(2)
        done()
      })
  })

  it('can add a patron to a bar that does not exist', (done) => {
    Bar.addPatron({ yelp_id: 'seven', email: 'seven@seven.com' })
      .then(() => Bar.findOne({ yelp_id: 'seven' }))
      .then((bar) => {
        expect(bar.patrons.length).toEqual(1)
        done()
      })
  })

  


  it('can remove a patron from a bar and the bar if it has no patrons left', (done) => {
    Bar.removePatron({ yelp_id: 'one', email: 'one@one.com' })
      .then(() => Bar.find({}))
      .then(bars => {
        expect(bars.length).toEqual(5)
        done()
      })
  })






 

})