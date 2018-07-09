import { getToken } from './tokenApi'
import config from '../../config'

export default (fetchImpl) => {
  
  const fetchBars = (location) => { 
    return fetchImpl.post('/api/bars', location) 
  }
  const addPatron = (patron) => {
    return fetchImpl.post('/api/bars/patron', patron, { headers: { authorization: getToken() } })
  } 
  const removePatron = (patron) => {
    return fetchImpl.post('/api/bars/patron/remove', patron, { headers: { authorization: getToken() } }) 
  }

  return {
    fetchBars,
    addPatron,
    removePatron
  }

}