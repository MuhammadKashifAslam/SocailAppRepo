// import { call, put, takeEvery } from 'redux-saga/effects';
// import axios from 'axios';
// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILED,
//   SIGNUP_REQUEST,
//   SIGNUP_SUCCESS,
//   SIGNUP_FAILED,
// } from './actions';

// function* loginUser(action) {
//   try {
//     const response = yield call(axios.post, 'http://192.168.0.121:5000/api/auth/login', action.payload);
//     yield put({ type: LOGIN_SUCCESS, payload: response.data });
//   } catch (error) {
//     console.error('Login Error:', error);
//     if (error.response) {
//       // Server responded with a status other than 2xx
//       console.error('Response Data:', error.response.data);
//       console.error('Response Status:', error.response.status);
//       console.error('Response Headers:', error.response.headers);
//       yield put({ type: LOGIN_FAILED, message: error.response.data.message || 'Login failed' });
//     } else if (error.request) {
//       // Request was made but no response received
//       console.error('Request Data:', error.request);
//       yield put({ type: LOGIN_FAILED, message: 'No response from server' });
//     } else {
//       // Something else happened
//       console.error('Error Message:', error.message);
//       yield put({ type: LOGIN_FAILED, message: error.message });
//     }
//   }
// }

// function* signUpUser(action) {
//   try {
//     const response = yield call(axios.post, 'http://192.168.0.121:5000/api/auth/signup', action.payload);
//     yield put({ type: SIGNUP_SUCCESS, payload: response.data });
//   } catch (error) {
//     console.error('Signup Error:', error);
//     if (error.response) {
//       console.error('Response Data:', error.response.data);
//       console.error('Response Status:', error.response.status);
//       console.error('Response Headers:', error.response.headers);
//       yield put({ type: SIGNUP_FAILED, message: error.response.data.message || 'Signup failed' });
//     } else if (error.request) {
//       console.error('Request Data:', error.request);
//       yield put({ type: SIGNUP_FAILED, message: 'No response from server' });
//     } else {
//       console.error('Error Message:', error.message);
//       yield put({ type: SIGNUP_FAILED, message: error.message });
//     }
//   }
// }

// function* mySaga() {
//   yield takeEvery(LOGIN_REQUEST, loginUser);
//   yield takeEvery(SIGNUP_REQUEST, signUpUser);
// }

// export default mySaga;


import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  GOOGLE_SIGN_IN_REQUEST,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAILED,
  // FACEBOOK_SIGN_IN_REQUEST,
  FACEBOOK_SIGN_IN_SUCCESS,
  FACEBOOK_SIGN_IN_FAILED,
} from './actions';

const BASE_URL = 'http://192.168.3.119:5000/api/auth'; // Update with your IP address

GoogleSignin.configure({
  webClientId: `560714491104-6qmetd0gs7u2ilqmo1pt8eviqp95q8vn.apps.googleusercontent.com`,
});

function* checkInternetConnection() {
  const state = yield call(NetInfo.fetch);
  if (!state.isConnected) {
    showMessage({
      message: "No Internet Connection",
      description: "Please connect to the internet.",
      type: "danger",
    });
    throw new Error('No internet connection');
  }
}

function* loginUser(action) {
  try {
    yield call(checkInternetConnection);
    const response = yield call(axios.post, `${BASE_URL}/login`, action.payload);
    yield put({ type: LOGIN_SUCCESS, payload: response.data });
    showMessage({
      message: "Login Successful",
      description: "You have successfully logged in.",
      type: "success",
    });
  } catch (error) {
    console.error('Login Error:', error);
    if (error.message === 'No internet connection') {
      return;
    }
    if (error.response) {
      showMessage({
        message: "Login Failed",
        description: error.response.data.message || 'Login failed',
        type: "danger",
      });
      yield put({ type: LOGIN_FAILED, message: error.response.data.message || 'Login failed' });
    } else if (error.request) {
      showMessage({
        message: "Login Failed",
        description: 'No response from server',
        type: "danger",
      });
      yield put({ type: LOGIN_FAILED, message: 'No response from server' });
    } else {
      showMessage({
        message: "Login Failed",
        description: error.message,
        type: "danger",
      });
      yield put({ type: LOGIN_FAILED, message: error.message });
    }
  }
}

function* signUpUser(action) {
  try {
    yield call(checkInternetConnection);
    const response = yield call(axios.post, `${BASE_URL}/signup`, action.payload);
    yield put({ type: SIGNUP_SUCCESS, payload: response.data });
    showMessage({
      message: "Signup Successful",
      description: "You have successfully signed up.",
      type: "success",
    });
  } catch (error) {
    console.error('Signup Error:', error);
    if (error.message === 'No internet connection') {
      return;
    }
    if (error.response) {
      showMessage({
        message: "Signup Failed",
        description: error.response.data.message || 'Signup failed',
        type: "danger",
      });
      yield put({ type: SIGNUP_FAILED, message: error.response.data.message || 'Signup failed' });
    } else if (error.request) {
      showMessage({
        message: "Signup Failed",
        description: 'No response from server',
        type: "danger",
      });
      yield put({ type: SIGNUP_FAILED, message: 'No response from server' });
    } else {
      showMessage({
        message: "Signup Failed",
        description: error.message,
        type: "danger",
      });
      yield put({ type: SIGNUP_FAILED, message: error.message });
    }
  }
}

function* googleSignIn() {
  console.log('Google sign-in saga called'); // Add this log to ensure the saga is being called
  try {
    yield call(checkInternetConnection);
    console.log('Checking internet connection...');
    const userInfo = yield call(GoogleSignin.signIn);
    console.log('Google Sign-In successful, userInfo:', userInfo);
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    const userCredential = yield call(auth().signInWithCredential, googleCredential);
    console.log('Firebase sign-in successful, user:', userCredential.user);
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
    };
    yield put({ type: GOOGLE_SIGN_IN_SUCCESS, payload: user });
    showMessage({
      message: "Google Sign-In Successful",
      description: "You have successfully signed in with Google.",
      type: "success",
    });
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    if (error.message === 'No internet connection') {
      return;
    }
    showMessage({
      message: "Google Sign-In Failed",
      description: error.message,
      type: "danger",
    });
    yield put({ type: GOOGLE_SIGN_IN_FAILED, message: error.message });
  }
}

// function* facebookSignIn() {
//   try {
//     yield call(checkInternetConnection);
//     const result = yield call([LoginManager, LoginManager.logInWithPermissions], ['public_profile', 'email']);
//     if (result.isCancelled) {
//       throw 'User cancelled the login process';
//     }
//     const data = yield call(AccessToken.getCurrentAccessToken);
//     if (!data) {
//       throw 'Something went wrong obtaining access token';
//     }
//     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
//     const userCredential = yield call(auth().signInWithCredential, facebookCredential);
//     yield put({ type: FACEBOOK_SIGN_IN_SUCCESS, payload: userCredential.user });
//     showMessage({
//       message: "Facebook Sign-In Successful",
//       description: "You have successfully signed in with Facebook.",
//       type: "success",
//     });
//   } catch (error) {
//     console.error('Facebook Sign-In Error:', error);
//     if (error.message === 'No internet connection') {
//       return;
//     }
//     showMessage({
//       message: "Facebook Sign-In Failed",
//       description: error.message,
//       type: "danger",
//     });
//     yield put({ type: FACEBOOK_SIGN_IN_FAILED, message: error.message });
//   }
// }

function* mySaga() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
  yield takeEvery(SIGNUP_REQUEST, signUpUser);
  yield takeEvery(GOOGLE_SIGN_IN_REQUEST, googleSignIn);
  // yield takeEvery(FACEBOOK_SIGN_IN_REQUEST, facebookSignIn);
}

export default mySaga;

