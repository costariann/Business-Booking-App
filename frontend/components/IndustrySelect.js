import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const industryOptions = [
  { label: 'Marketing/Sales', value: 'null' },
  { label: 'Health Care', value: 'Health Care' },
  { label: 'Beauty/Grooming', value: 'Beauty/Groomig' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Retailer', value: 'Retailer' },
  {
    label: 'Creative, Media, Art & Entertainment',
    value: 'Creative, Media, Art & Entertainment',
  },
  { label: 'Leisure & Travel', value: 'Leisure & Travel' },
  { label: 'Legal Services', value: 'Legal Services' },
  { label: 'Tutor & Education', value: 'Tutor & Education' },
  { label: 'Consultant', value: 'Consultant' },
  { label: 'Other', value: 'Other' },
];
const IndustrySelect = ({ onSelectIndustry, dynamicStyle }) => {
  const [industry, setIndustry] = useState(null);

  useEffect(() => {
    onSelectIndustry(industry);
  }, [industry]);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, dynamicStyle]}
        data={industryOptions}
        placeholder="Select Industry"
        placeholderStyle={styles.placeholder}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        mode="modal"
        value={industry}
        labelField="label"
        valueField="value"
        search
        searchPlaceholder="Search Industry..."
        onChange={(item) => {
          setIndustry(item.value);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 12,
    backgroundColor: '#fafafa',
  },
  placeholder: {
    fontSize: 15,
    color: '#C7C7CD',
    fontWeight: 400,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default IndustrySelect;
