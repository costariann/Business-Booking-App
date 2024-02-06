import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSignin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { dispatch } = useAuthContext();

  const signin = async (email, password) => {
    setLoading(true);
    setError(null); // Clear previous error

    try {
      const response = await fetch('http://172.20.10.3:4000/api/users/signin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message); // Throw error with message from backend
      }

      const json = await response.json();
      await AsyncStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      setIsAuthenticated(true);
    } catch (e) {
      setError(e.message); // Set error message for display
    } finally {
      setLoading(false);
    }
  };

  return {
    signin,
    loading,
    error,
    isAuthenticated,
  };
};
