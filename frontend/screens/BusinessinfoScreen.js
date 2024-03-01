import React, { useEffect, useReducer, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IndustrySelect from '../components/IndustrySelect';
import CountrySelect from '../components/CountrySelect';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        businessinfo: action.payload,
        error: '',
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
  }
};

const BusinessinfoScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [isError, setIsError] = useState({});
  const [saveDisabled, setSaveDisabled] = useState(false);

  const navigation = useNavigation();

  const [{ loading, businessinfo, error }, dispatch] = useReducer(reducer, {
    loading: false,
    businessinfo: {},
    error: '',
  });

  const validationForm = () => {
    let isError = {};

    if (!name) isError.name = 'Name is required';
    if (!industry) isError.industry = 'Industry is required';
    if (!address) isError.address = 'Address is required';
    if (!country) isError.country = 'Country is required';
    if (!email) isError.email = 'Name is required';
    if (!mobile) isError.mobile = 'Mobile is required';
    if (!description) isError.description = 'Name is required';

    setIsError(isError);
    return Object.keys(isError).length === 0;
  };

  useEffect(() => {
    setSaveDisabled(
      !name ||
        !address ||
        !email ||
        !mobile ||
        !description ||
        !country ||
        !industry ||
        loading ||
        error
    );
  }, [
    name,
    address,
    email,
    mobile,
    description,
    country,
    industry,
    loading,
    error,
  ]);

  const handleSubmit = async () => {
    if (!validationForm()) {
      return;
    }

    dispatch({ type: 'FETCH_REQUEST' });

    try {
      const response = await fetch(
        'http://172.20.10.3:4000/api/businesses/business',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            industry,
            address,
            country,
            email,
            mobile,
            description,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: { businessinfo: data } });
        await AsyncStorage.setItem('businessinfocompleted', 'true');
        navigation.navigate('OverviewScreen');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save business info');
      }
    } catch (error) {
      dispatch({ type: 'FETCH_FAIL', payload: error.message });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#493f9a" />
      ) : error ? (
        <Text
          style={{
            alignItems: 'center',
            color: 'red',
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'pink',
            padding: 12,
          }}
        >
          {error}
        </Text>
      ) : (
        <View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.text}>Business Info</Text>
          </View>
          <View style={styles.businessinfo}>
            <SimpleLineIcons name="info" size={20} color="#808080" />
            <Text style={{ color: '#808080', fontSize: 15 }}>
              {'  '}
              Provide business details in this section
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={[styles.textInput, isError.name && { borderColor: 'red' }]}
              placeholder="Volpram Ent"
              value={name}
              autoFocus={false}
              textContentType="name"
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Industry</Text>
            <IndustrySelect
              onSelectIndustry={setIndustry}
              dynamicStyle={isError.industry && { borderColor: 'red' }}
            />
          </View>
          <View style={styles.inputContainerforaddress}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={[
                styles.textInput,
                isError.address && { borderColor: 'red' },
              ]}
              placeholder="Adenta Frafraha"
              value={address}
              autoFocus={false}
              textContentType="none"
              autoCapitalize="none"
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Country</Text>
            <CountrySelect
              onSelectCountry={setCountry}
              dynamicStyles={isError.country && { borderColor: 'red' }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[
                styles.textInput,
                isError.email && { borderColor: 'red' },
              ]}
              placeholder="Email"
              value={email}
              autoFocus={false}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile</Text>
            <TextInput
              style={[
                styles.textInput,
                isError.mobile && { borderColor: 'red' },
              ]}
              placeholder="024 xxxxxxx"
              value={mobile}
              autoFocus={false}
              textContentType="telephoneNumber"
              autoCapitalize="none"
              onChangeText={(text) => setMobile(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[
                styles.textInputArea,
                isError.description && { borderColor: 'red' },
              ]}
              placeholder="Describe what your business do"
              value={description}
              autoFocus={false}
              multiline={true}
              textContentType="none"
              autoCapitalize="none"
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={{ marginTop: 120 }}>
            <View style={{ marginBottom: 20 }}>
              <Divider />
            </View>
            <Pressable
              style={[styles.button, saveDisabled && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={saveDisabled}
            >
              <Text>Save</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: 50,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#493f9a',
  },

  businessinfo: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 30,
    padding: 5,
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#0000',
    marginBottom: 20,
  },

  inputContainer: {
    paddingHorizontal: 12,
  },

  textInput: {
    justifyContent: 'flex-start',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: '#fafafa',
    position: 'relative',
    marginBottom: 20,
  },
  inputContainerforaddress: {
    marginTop: 60,
    paddingHorizontal: 12,
  },

  inputLabel: {
    fontSize: 15,
    position: 'absolute',
    top: -10,
    left: 20,
    zIndex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 5,
    color: 'grey',
  },
  textInputArea: {
    justifyContent: 'flex-start',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: '#fafafa',
    position: 'relative',
    marginBottom: 20,
    height: 150,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
    padding: 15,
    backgroundColor: '#493f94',
    width: 170,
    marginLeft: 120,
  },
  buttonDisabled: {
    backgroundColor: '#cccc',
  },
});

export default BusinessinfoScreen;
