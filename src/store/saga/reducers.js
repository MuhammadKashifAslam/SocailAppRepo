import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAILED,
  Get_ALL_PRODUCTS_SUCCESS,
  Get_ALL_PRODUCTS_FAILED
  // FACEBOOK_SIGN_IN_SUCCESS,
  // FACEBOOK_SIGN_IN_FAILED,
} from './actions';

const initialState = {
  token: null,
  user: null,
  message: '',
};

const rootReducer = (state = initialState, action) => {
  console.log("Response is..................." + JSON.stringify(action));

  switch (action.type) {
    case LOGIN_SUCCESS:
    case GOOGLE_SIGN_IN_SUCCESS:
    // case FACEBOOK_SIGN_IN_SUCCESS:
      return { ...state, token: action.payload.token, user: action.payload.user, message: '' };
    case LOGIN_FAILED:
    case GOOGLE_SIGN_IN_FAILED:
    // case FACEBOOK_SIGN_IN_FAILED:
      return { ...state, message: action.message };
    case SIGNUP_SUCCESS:
      return { ...state, message: 'Sign up successful! Please log in.' };
    case SIGNUP_FAILED:
      return { ...state, message: action.message };

      case Get_ALL_PRODUCTS_SUCCESS:
        return { ...state, message: 'Products' };
        case Get_ALL_PRODUCTS_SUCCESS:
          return { ...state, message: 'Failed to retrieved products' };
    default:
      return state;
  }
};

export default rootReducer;
