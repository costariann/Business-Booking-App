import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('http://172.20.10.3:4000/api/users/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(json));
        } catch (e) {
          console.log('Error saving data to storage', e);
        }

        dispatch({ type: 'LOGIN', payload: json });
        setLoading(false);
      }
    } catch (error) {
      console.log('Error during fetch', error);
      setLoading(false);
      setError('An error occured during network request');
    }
  };

  return {
    signup,
    loading,
    error,
  };
};
