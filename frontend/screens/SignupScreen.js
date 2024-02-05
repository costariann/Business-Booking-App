import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSignup } from '../hooks/useSignup';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const logo = require('frontend/assets/images/undraw_Sign_up_n6im.png');

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState({});
  const { signup, loading, error } = useSignup();
  const navigation = useNavigation();

  const validationForm = () => {
    let isError = {};
    if (!name) isError.name = 'Name is required';
    if (!email) isError.email = 'Email is required';
    if (!password) isError.password = 'Password is required';

    setIsError(isError);
    return Object.keys(isError).length === 0;
  };

  const handleSubmit = async () => {
    if (validationForm()) {
      console.log('Submitted', name, email);
      await signup(name, email, password);
      console.log('Form data before signup:', name, email, password);
      setName('');
      setEmail('');
      setPassword('');
      setIsError({});
      navigation.navigate('BusinessinfoScreen');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#493f9a" />
      ) : (
        <View style={{ marginTop: 80 }}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={{ height: 150, width: 150 }} />
          </View>
          <View>
            <Text style={styles.title}>Create an account</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            accessible={false}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                placeholder="Name"
                style={styles.textInput}
                value={name}
                autoFocus={false}
                textContentType="name"
                autoCapitalize="none"
                onChangeText={(text) => {
                  setName(text);
                }}
              ></TextInput>

              {isError.name ? (
                <View>
                  <Text style={styles.isError}>{isError.name}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                value={email}
                autoFocus={false}
                textContentType="emailAddress"
                autoCapitalize="none"
                onChangeText={(text) => {
                  setEmail(text);
                }}
              ></TextInput>

              {isError.email ? (
                <View>
                  <Text style={styles.isError}>{isError.email}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                value={password}
                autoFocus={false}
                autoCorrect={false}
                keyboardType="default"
                textContentType="password"
                autoCapitalize="none"
                onChangeText={(text) => {
                  setPassword(text);
                }}
              ></TextInput>

              {isError.password ? (
                <View>
                  <Text style={styles.isError}>{isError.password}</Text>
                </View>
              ) : null}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </TouchableWithoutFeedback>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={{ color: '#f1f1f1', fontSize: 15, fontWeight: 800 }}>
              Sign Up
            </Text>
          </Pressable>
          <View style={styles.signupContainer}>
            <Text>Do you already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace('SigninScreen');
              }}
            >
              <Text style={{ color: '#6BB0F5' }}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  title: {
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#493f9a',
  },

  textInput: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
    position: 'relative',
    zIndex: 0,
  },

  inputLabel: {
    fontSize: 16,
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
    backgroundColor: '#493f94',
    marginTop: 30,
  },

  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 30,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },

  isError: {
    color: 'red',
    marginBottom: 20,
  },
});

export default SignupScreen;
