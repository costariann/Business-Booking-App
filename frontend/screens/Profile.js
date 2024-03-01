import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTab } from '../components/BottomTab';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>This is Profile Page</Text>
      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
