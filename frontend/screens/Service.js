import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTab } from '../components/BottomTab';

const Service = () => {
  return (
    <View style={styles.container}>
      <Text>This is service page </Text>
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

export default Service;
