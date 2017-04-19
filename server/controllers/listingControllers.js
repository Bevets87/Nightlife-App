import Attendees from '../models/Attendees'

import yelp from 'yelp-fusion'
import { CLIENTID, CLIENTSECRET } from '../config'

export const handle_get_listings = (req, res) => {
  const location = req.body.searchTerm
  const searchRequest = {
    term: 'bars',
    location: location
  }

  yelp.accessToken(CLIENTID, CLIENTSECRET).then(response => {
    const client = yelp.client(response.jsonBody.access_token)

    client.search(searchRequest)
      .then(
        response => {
          const listings = response.jsonBody.businesses
          res.json({listings})
      })
      .catch( error => {
          res.status(404).send('The search failed! Please try again.')
      })
  })
}

export const handle_get_attendees = (req, res) => {
  console.log(req.params)
}

export const handle_create_attendees = (req, res) => {
  console.log(req.body)
}

export const handle_update_attendees = (req, res) => {
  console.log(req.body)
}
