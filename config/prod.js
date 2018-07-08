export const port = process.env.PORT
export const host = process.env.HOST
export const yelp = { api_key: process.env.YELP_API_KEY }
export const jwt = { secret: process.env.JWT_SECRET, expiration: process.env.JWT_EXPIRATION }
export const db = { url: process.env.MONGODB_URI }


