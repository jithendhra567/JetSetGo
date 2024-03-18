import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/styles';
import {WIDTH} from '../utils/common';

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Vishakapatanam',
];

export type selectType = 'from' | 'to';

type Props = {
  selectionKey: selectType;
  onClose: () => void;
  onSelect: (value: string) => void;
};

const CitySelector = ({selectionKey, onClose, onSelect}: Props) => {
  const onItemPress = (item: string) => {
    onSelect(item);
    onClose();
  };

  const renderItem = ({item}: {item: string}) => (
    <TouchableOpacity
      onPress={() => onItemPress(item)}
      style={styles.itemContainer}>
      <Text style={styles.item}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Travelling {selectionKey}?</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={CITIES}
        renderItem={renderItem}
        keyExtractor={item => item}
        // ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    padding: 20,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES['3xl'],
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  close: {
    color: COLORS.RED,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: COLORS.BLACK_OPAC_90,
    marginVertical: 8,
    borderWidth: 1,
  },
  item: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES.xl,
    marginVertical: 10,
  },
  seperator: {
    height: 0.5,
    width: WIDTH,
    backgroundColor: COLORS.BLACK_OPAC_90,
  },
});

export default CitySelector;
