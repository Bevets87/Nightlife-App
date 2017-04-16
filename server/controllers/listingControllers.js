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

    client.search(searchRequest).then(
      response => {
        const listings = response.jsonBody.businesses
        res.json({listings})
      },
      error => {
        error = error.response.body
        res.json({error})
      }
    )
  })
}
