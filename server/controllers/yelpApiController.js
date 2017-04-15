import yelp from 'yelp-fusion'

const clientId = 'seAX967Wk8qiVXOYjbregg'
const clientSecret = '6IeifH91Xo8bzLOsXuPojHIH1oxP3WClPbbcwxv1isScg5kM9uJH9cfZNkMPTQMc'

export const handle_create_yelpApi = (req, res) => {
  const location = req.body.searchTerm

  const searchRequest = {
    term: 'bars',
    location: location
  }

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token)

    client.search(searchRequest).then(response => {
      const bars = response.jsonBody.businesses
      res.json({bars})
    })
  }).catch(e => {
      res.json({e})
  })
}
