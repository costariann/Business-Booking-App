import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSignin } from '../hooks/useSignin';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('frontend/assets/images/undraw_Sign_up_n6im.png');

const SigninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState({});
  const { signin, loading, error, isAuthenticated } = useSignin();
  const navigation = useNavigation();

  const validationForm = () => {
    let isError = {};

    if (!email) isError.email = 'Email is required';
    if (!password) isError.password = 'Password is required';

    setIsError(isError);

    return Object.keys(isError).length === 0;
  };

  const handleSubmit = async () => {
    if (!validationForm()) {
      return;
    }

    try {
      await signin(email, password);

      if (!error && isAuthenticated) {
        const businessInfoFlag = await AsyncStorage.getItem(
          'businessinfocompleted'
        );

        if (businessInfoFlag === 'true') {
          navigation.replace('OverviewScreen');
        } else {
          navigation.replace('BusinessinfoScreen');

          setEmail('');
          setPassword('');
        }
      }
    } catch (error) {
      [console.error('Invalid email or password', error)];
      setEmail('');
      setPassword('');
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
            <Text style={styles.title}>Welcome Back, Log In</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="jadonsancho@gmail.com"
              value={email}
              autoFocus={false}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            {isError.email ? (
              <View>
                <Text style={styles.isError}>{isError.email}</Text>
              </View>
            ) : null}
            {error && (
              <View>
                <Text style={styles.isError}>{error.message}</Text>
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="**************"
              value={password}
              autoFocus={false}
              textContentType="password"
              autoCapitalize="none"
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            {isError.password ? (
              <View>
                <Text style={styles.isError}>{isError.password}</Text>
              </View>
            ) : null}
            <Pressable
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text
                style={{ color: '#f1f1f1', fontSize: 15, fontWeight: 'bold' }}
              >
                Sign In
              </Text>
            </Pressable>
            {error && (
              <View>
                <Text style={styles.isError}>{error}</Text>
              </View>
            )}
            <View style={styles.signupContainer}>
              <Text>Are you new?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignupScreen');
                }}
              >
                <Text style={{ color: '#6BB0F5' }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
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

  isError: {
    color: 'red',
    marginBottom: 20,
  },
});

export default SigninScreen;
