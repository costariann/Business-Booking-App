import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

const countryOptions = [
  { label: 'Ghana', value: 'null' },
  { label: 'Nigeria', value: 'Nigeria' },
  { label: 'South Africa', value: 'South Africa' },
  { label: 'Mali', value: 'Mali' },
];

const CountrySelect = ({ onSelectCountry, dynamicStyles }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    onSelectCountry(country);
  }, [country]);
  return (
    <SelectCountry
      style={[styles.dropdowm, dynamicStyles]}
      data={countryOptions}
      value={country}
      placeholder="Select Country"
      placeholderStyle={styles.placeholder}
      mode="modal"
      labelField="label"
      valueField="value"
      onChange={(item) => setCountry(item.value)}
    />
  );
};

const styles = StyleSheet.create({
  dropdowm: {
    justifyContent: 'flex-start',
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: '#fafafa',
    position: 'relative',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 15,
    color: '#C7C7CD',
    fontWeight: 400,
  },
});

export default CountrySelect;
