import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Onboard from './screens/Onboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './context/AuthContext';
import BusinessinfoScreen from './screens/BusinessinfoScreen';
import OverviewScreen from './screens/OverviewScreen';
import Booking from './screens/Booking';
import Service from './screens/Service';
import Profile from './screens/Profile';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [viewedBusinessScreen, setViewedBusinessScreen] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('user');

      if (value !== null) {
        setViewedOnboarding(true);
      }

      const businessInfoFlag = await AsyncStorage.getItem(
        'businessinfocompleted'
      );
      if (businessInfoFlag === 'true') {
        setViewedBusinessScreen(true);
      }
    } catch (err) {
      console.log('Error user', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={viewedOnboarding ? 'SignupScreen' : 'Onboarding'}
        >
          {loading && <Stack.Screen name="Loading" component={Loading} />}
          {!viewedOnboarding && (
            <Stack.Screen name="Onboard" component={Onboard} />
          )}
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="SigninScreen" component={SigninScreen} />
          <Stack.Screen
            name="BusinessinfoScreen"
            component={BusinessinfoScreen}
          />
          <Stack.Screen name="OverviewScreen" component={OverviewScreen} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="Service" component={Service} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
