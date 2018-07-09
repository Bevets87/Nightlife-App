const port = process.env.PORT
const yelp = { api_key: process.env.YELP_API_KEY }
const jwt = { secret: process.env.JWT_SECRET, expiration: process.env.JWT_EXPIRATION }
const db = { url: process.env.MONGODB_URI }

module.exports = {
  port, yelp, jwt, db
}
