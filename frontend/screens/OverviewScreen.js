import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BottomTab } from '../components/BottomTab';

const OverviewScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is overview screen</Text>
      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default OverviewScreen;
