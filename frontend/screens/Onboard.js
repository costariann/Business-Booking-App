import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { slides } from '../slides';
import OnboardItem from '../components/OnboardItem';
import Paginator from '../components/Paginator';
import { useNavigation } from '@react-navigation/native';

const Onboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const navigation = useNavigation();

  const viewableIndexChange = useRef(({ viewableItem }) => {
    if (viewableItem && viewableItem.length > 0) {
      setCurrentIndex(viewableItem[0].index);
    }
  }).current;
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleGetStarted = () => {
    navigation.replace('SignupScreen');
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableIndexChange}
          viewabilityConfig={viewabilityConfig}
          ref={slideRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={{ color: '#f1f1f1', fontSize: 15, fontWeight: '800' }}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#493d8a',
    width: 180,
    marginBottom: 25,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
});

export default Onboard;
