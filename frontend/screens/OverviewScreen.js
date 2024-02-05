import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const OverviewScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is overview screen</Text>
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
