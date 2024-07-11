// Auth Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const GOOGLE_SIGN_IN_REQUEST = 'GOOGLE_SIGN_IN_REQUEST';
export const GOOGLE_SIGN_IN_SUCCESS = 'GOOGLE_SIGN_IN_SUCCESS';
export const GOOGLE_SIGN_IN_FAILED = 'GOOGLE_SIGN_IN_FAILED';

export const FACEBOOK_SIGN_IN_REQUEST = 'FACEBOOK_SIGN_IN_REQUEST';
export const FACEBOOK_SIGN_IN_SUCCESS = 'FACEBOOK_SIGN_IN_SUCCESS';
export const FACEBOOK_SIGN_IN_FAILED = 'FACEBOOK_SIGN_IN_FAILED';

// Auth Action Creators
export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailed = (message) => ({
  type: LOGIN_FAILED,
  message,
});

export const signUpRequest = (payload) => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const signUpSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const signUpFailed = (message) => ({
  type: SIGNUP_FAILED,
  message,
});

export const googleSignInRequest = () => ({
  type: GOOGLE_SIGN_IN_REQUEST,
});

export const googleSignInSuccess = (payload) => ({
  type: GOOGLE_SIGN_IN_SUCCESS,
  payload,
});

export const googleSignInFailed = (message) => ({
  type: GOOGLE_SIGN_IN_FAILED,
  message,
});

// export const facebookSignInRequest = () => ({
//   type: FACEBOOK_SIGN_IN_REQUEST,
// });

// export const facebookSignInSuccess = (payload) => ({
//   type: FACEBOOK_SIGN_IN_SUCCESS,
//   payload,
// });

// export const facebookSignInFailed = (message) => ({
//   type: FACEBOOK_SIGN_IN_FAILED,
//   message,
// });
