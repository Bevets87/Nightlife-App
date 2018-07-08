export default (actions, authApi) => {

  const _dispatchAuthSuccess = (dispatch) => (response) => {
    dispatch(actions.authSuccess(response.data))

  }

  const _dispatchAuthFailure = (dispatch) => (error) => {
    dispatch(actions.authFailure(error.response.data))
 
  }

  const _dispatchClearAuthSuccess = (dispatch) => () => {
    dispatch(actions.clearAuthSuccess())
    Promise.resolve()
  }
  
  return {
    signinUser: (user) => (dispatch) =>  authApi.signinUser(user)
      .then(_dispatchAuthSuccess(dispatch))
      .catch(_dispatchAuthFailure(dispatch))
    ,
    signupUser: (user) => (dispatch) => authApi.signupUser(user)
      .then(_dispatchAuthSuccess(dispatch))
      .catch(_dispatchAuthFailure(dispatch))
    ,
    signoutUser: () => (dispatch) => authApi.signoutUser()
      .then(_dispatchClearAuthSuccess(dispatch))
    ,
    getMe: () => (dispatch) => authApi.getMe()
      .then(_dispatchAuthSuccess(dispatch))
      .catch(() => Promise.resolve())
  }

}





