import yelp from 'yelp-fusion'

export const handle_get_listings = (req, res) => {
  const location = req.body.searchTerm
  const searchRequest = {
    term: 'bars',
    location: location
  }

  yelp.accessToken(process.env.CLIENTID, process.env.CLIENTSECRET).then(response => {
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
