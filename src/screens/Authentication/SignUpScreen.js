import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';
import { Picker } from '@react-native-picker/picker';
import Images from '../../Resource';
import colors from '../../Utils/colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useStore } from '../../store';
import { signUpRequest } from '../../store/saga/actions';

const SignUpScreen = observer(({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const { userStore } = useStore();
  const message = useSelector(state => state.message);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSignUp = () => {
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

    const payload = { firstName, lastName, email, password, gender };
    dispatch(signUpRequest(payload));
  };

  const setGenderType = (itemValue) => {
    setGender(itemValue);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={Images?.logo} style={styles?.imageStyle} resizeMode='contain' />
        <View style={{ alignSelf: 'flex-start', marginLeft: responsiveWidth(6) }}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.description}>Create a new account</Text>
        </View>
        <View style={{ marginTop: responsiveHeight(5) }}>
          <View style={styles.inputContainer}>
            {/* <Icon name="person" size={20} color={colors.black} style={styles.icon} /> */}
            <TextInput
              style={styles.input}
              placeholderTextColor={colors?.gray}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            {/* <Icon name="person" size={20} color={colors.gray} style={styles.icon} /> */}
            <TextInput
              style={styles.input}
              placeholderTextColor={colors?.gray}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputContainer}>
            {/* <Icon name="email" size={20} color={colors.gray} style={styles.icon} /> */}
            <TextInput
              style={[styles.input, emailError && styles.errorInput]}
              placeholder="Email"
              placeholderTextColor={colors?.gray}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {emailError && <Text style={styles.errorText}>Please enter a valid email.</Text>}
          <View style={styles.inputContainer}>
        
            <TextInput
              style={[styles.input, passwordError && styles.errorInput]}
              placeholder="Password"
              placeholderTextColor={colors?.gray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
              <Image source={Images?.password} style={styles.icon} />
          </View>
          {passwordError && <Text style={styles.errorText}>Password cannot be empty.</Text>}
          <View style={styles.inputContainer}>
           
            <Text style={styles.genderLabel}>Select Gender</Text>
            <Picker
              selectedValue={gender}
              dropdownIconColor={colors?.RebeccaPurple}
              style={styles.picker}
              placeholderTextColor={colors?.gray}
              onValueChange={setGenderType}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
            {/* <Image source={Images?.dropdown} style={styles.icon} /> */}
          </View>
        </View>
        {/* {message ? <Text style={styles.error}>{message}</Text> : null} */}
        <TouchableOpacity style={styles?.buttonStyle} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    color: colors?.black,
  },
  imageStyle: {
    width: responsiveWidth(80),
    height: responsiveHeight(32),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors?.RebeccaPurple,
    borderRadius: responsiveFontSize(2),
    marginVertical: 10,
    width: responsiveWidth(94),
  },
  input: {
    flex: 1,
    padding: 8,
    color: colors?.black,
  },
  picker: {
    flex: 1,
    height: 50,
    color: 'black',
  },
  icon: {
    height:responsiveHeight(4),
    width:responsiveWidth(7),
    alignSelf:'center',
    resizeMode:'contain',
    tintColor:colors?.RebeccaPurple,
    marginRight:responsiveWidth(1.5)
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
    color: colors?.gray,
  },
  buttonStyle: {
    backgroundColor: colors?.RebeccaPurple,
    width: responsiveWidth(90),
    paddingVertical: responsiveHeight(2.5),
    alignItems: 'center',
    marginTop: responsiveHeight(5),
    borderRadius: responsiveFontSize(4),
  },
  buttonText: {
    color: colors?.white,
    fontSize: responsiveFontSize(2),
  },
  genderLabel: {
    fontSize: responsiveFontSize(2),
    color: colors?.gray,
    marginLeft: 10,
  },
});

export default SignUpScreen;
