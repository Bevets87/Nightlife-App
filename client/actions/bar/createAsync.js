export default (actions, barApi) => {

  const _dispatchFetchSuccess = (dispatch) => (response) => {
    dispatch(actions.fetchBarsSuccess(response.data))
    return Promise.resolve()
  }

  const _dispatchFetchFailure = (dispatch) => (error) => {
    dispatch(actions.fetchBarsFailure(error.response.data))
    return Promise.reject()
  }

  const _dispatchUpdateSuccess = (dispatch) => (response) => {
    dispatch(actions.updateBarSuccess(response.data))
    return Promise.resolve()
  }

  const _dispatchUpdateFailure = (dispatch) => (error) => {
    dispatch(actions.updateBarFailure(error.response.data))
    return Promise.reject()
  }
  
  return {
    fetchBars: (location) => (dispatch) => barApi.fetchBars(location)
      .then(_dispatchFetchSuccess(dispatch))
      .catch(_dispatchFetchFailure(dispatch))
    ,
    addPatron: (patron) => (dispatch) => barApi.addPatron(patron)
      .then(_dispatchUpdateSuccess(dispatch))
      .catch(_dispatchUpdateFailure(dispatch))
    ,
    removePatron: (patron) => (dispatch) => barApi.removePatron(patron)
      .then(_dispatchUpdateSuccess(dispatch))
      .catch(_dispatchUpdateFailure(dispatch))
  }
} 



