import React, { useEffect, useState } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const bottomTabIcons = [
  {
    name: 'Overview',
    active: <Ionic name="grid" size={30} color="#493d8a" />,
    inactive: <Ionic name="grid-outline" size={30} color="#cccccc" />,
  },
  {
    name: 'Booking',
    active: <Ionic name="calendar" size={30} color="#493d8a" />,
    inactive: <Ionic name="calendar-outline" size={30} color="#cccccc" />,
  },
  {
    name: 'Service',
    active: <Ionic name="briefcase" size={30} color="#493d8a" />,
    inactive: <Ionic name="briefcase-outline" size={30} color="#cccccc" />,
  },
  {
    name: 'Profile',
    active: <FontAwesome name="user" size={30} color="#493d8a" />,
    inactive: <FontAwesome name="user-o" size={30} color="#cccccc" />,
  },
];

export const BottomTab = ({ icon }) => {
  const [active, setActive] = useState('Overview');
  const navigation = useNavigation();

  useEffect(() => {
    switch (active) {
      case 'Overview':
        navigation.navigate('OverviewScreen');

      case 'Booking':
        navigation.navigate('Booking');

      case 'Service':
        navigation.navigate('Service');

      case 'Profile':
        navigation.navigate('Profile');

      default:
        break;
    }
  });
  const handleBottomTabPress = (iconName) => {
    setActive(iconName);
  };

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.bottomTabContainer}>
        {bottomTabIcons.map((iconItem, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBottomTabPress(iconItem.name)}
          >
            <View style={styles.iconContainer}>
              {active === iconItem.name ? (
                <>
                  {iconItem.active}
                  <Text style={[styles.text, { color: '#493d8a' }]}>
                    {iconItem.name}
                  </Text>
                </>
              ) : (
                <>
                  {iconItem.inactive}
                  <Text style={[styles.text, { color: '#cccccc' }]}>
                    {iconItem.name}
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
  },
  wrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    zIndex: 999,
    backgroundColor: '#0000',
  },
  iconContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
});
