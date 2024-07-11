import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { observer } from 'mobx-react-lite';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { showMessage } from 'react-native-flash-message';
import { useStore } from '../../store';
import Images from '../../Resource';
import colors from '../../Utils/colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { loginRequest, googleSignInRequest, facebookSignInRequest } from '../../store/saga/actions';

GoogleSignin.configure({
  webClientId: '295373002096-jm2htfbdli036k10sprd0la43tkkr6p5.apps.googleusercontent.com',
});

const LoginScreen = observer(({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const { userStore } = useStore();

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    if (password === '') {
      setPasswordError(true);
      return;
    }
    setEmailError(false);
    setPasswordError(false);

    dispatch(loginRequest({ email, password }));
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = {
        uid: userInfo.idToken,
        email: userInfo.user.email,
        firstName: userInfo.user.name,
        photoURL: userInfo.user.photo,
      };
      userStore.setUser(user);
      AsyncStorage.setItem('userToken', userInfo.idToken);
      navigation.replace('Home');
      showMessage({
        message: "Google Sign-In Successful",
        description: "You have successfully signed in with Google.",
        type: "success",
      });
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        showMessage({
          message: "Google Sign-In Failed",
          description: error.message,
          type: "danger",
        });
      }
    }
  };

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name, first_name, last_name, email, picture.type(large)',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          const user = {
            uid: result.id,
            email: result.email,
            firstName: result.name,
            photoURL: result.picture.data.url,
          };
          userStore.setUser(user);
          AsyncStorage.setItem('userToken', token);
          navigation.replace('Home');
          showMessage({
            message: "Facebook Sign-In Successful",
            description: "You have successfully signed in with Facebook.",
            type: "success",
          });
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const handleFacebookSignIn = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
        showMessage({
          message: "Facebook Sign-In Failed",
          description: error.message,
          type: "danger",
        });
      }
    );
  };

  useEffect(() => {
    if (token) {
      AsyncStorage.setItem('userToken', token);
      navigation.replace('Home');
    }
  }, [token, navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={Images.logo} style={styles.imageStyle} resizeMode='contain' />
        <View style={{ alignSelf: 'flex-start', marginLeft: responsiveWidth(6) }}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.description}>Please login to your account</Text>
        </View>
        <View style={{ marginTop: responsiveHeight(5) }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, emailError && styles.errorInput]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Image source={Images.user} style={styles.icon} />
          </View>
          {emailError && <Text style={styles.errorText}>Please enter a valid email.</Text>}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, passwordError && styles.errorInput]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Image source={Images.eye} style={styles.icon} />
              ) : (
                <Image source={Images.eyeClose} style={styles.icon} />
              )}
            </TouchableOpacity>
          </View>
          {passwordError && <Text style={styles.errorText}>Password cannot be empty.</Text>}
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpButtonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity onPress={handleGoogleSignIn}>
            <Image source={Images.google} style={[styles.icon, { tintColor: '', width: responsiveWidth(10), resizeMode: 'contain', height: responsiveHeight(8) }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFacebookSignIn}>
            <Image source={Images.facebook} style={[styles.icon, { tintColor: '', width: responsiveWidth(10), resizeMode: 'contain', height: responsiveHeight(8) }]} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingBottom: responsiveHeight(5),
  },
  title: {
    fontSize: responsiveFontSize(3),
    color: colors.black,
  },
  imageStyle: {
    width: responsiveWidth(80),
    height: responsiveHeight(32),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.RebeccaPurple,
    borderRadius: responsiveFontSize(2),
    marginVertical: 10,
    width: responsiveWidth(94),
  },
  input: {
    flex: 1,
    padding: 8,
    color: colors.black,
  },
  icon: {
    height: responsiveHeight(4),
    width: responsiveWidth(7),
    alignSelf: 'center',
    resizeMode: 'contain',
    tintColor: colors.RebeccaPurple,
    marginRight: responsiveWidth(1.5),
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: responsiveWidth(6),
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  description: {
    fontSize: responsiveFontSize(2),
    lineHeight: responsiveHeight(4),
    paddingTop: responsiveHeight(2),
    color: colors.gray,
  },
  buttonStyle: {
    backgroundColor: colors.RebeccaPurple,
    width: responsiveWidth(90),
    paddingVertical: responsiveHeight(2.5),
    alignItems: 'center',
    marginTop: responsiveHeight(5),
    borderRadius: responsiveFontSize(4),
  },
  buttonText: {
    color: colors.white,
    fontSize: responsiveFontSize(2),
  },
  signUpButton: {
    marginTop: responsiveHeight(2),
  },
  signUpButtonText: {
    color: colors.RebeccaPurple,
    fontSize: responsiveFontSize(2),
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: responsiveHeight(2),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray,
  },
  dividerText: {
    marginHorizontal: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
    color: colors.gray,
  },
  socialLoginContainer: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.RebeccaPurple,
    width: '100%',
    paddingVertical: responsiveHeight(2.5),
    marginVertical: responsiveHeight(1),
    borderRadius: responsiveFontSize(2),
  },
  socialButtonText: {
    color: colors.white,
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(2),
  },
});

export default LoginScreen;
