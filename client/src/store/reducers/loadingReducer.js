import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loggingIn: false,
  logginError: false,
  errorMessage: '',
  loginSuccess: false,
  accessSuccess: false,
  successMessage: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START:
    return {
      ...state,
      loggingIn: true,
    };
    case actionTypes.FAIL:
    return {
      ...state,
      loggingIn: false,
      loginError: true,
      errorMessage: action.error,
    };
    case actionTypes.SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loginSuccess: true,
      }
    case actionTypes.ACCESS_SUCCESS:
      return {
        ...state,
        accessSuccess: true,
        successMessage: 'Your request has been sent'
      }
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: '',
      }
    case actionTypes.CLEAR:
      return {
        ...state,
        initialState
      }
    default: return {...state};
  }
}

export default reducer;