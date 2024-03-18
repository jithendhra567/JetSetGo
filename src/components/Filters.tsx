import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/styles';
import {HEIGHT, WIDTH} from '../utils/common';
import PrimaryButton from './PrimaryButton';
import {CustomTabs} from './CustomTabs';

export type AirlineType = {
  name: string;
  length: boolean;
};

export type SortType = {
  price: number;
  duration: number;
  departure: number;
};

export type FiltersType = {
  sort: SortType;
  airlines: any;
};

type Props = {
  onApply: (data: FiltersType) => void;
  airlines: AirlineType[];
  onDismiss: () => void;
  filter: FiltersType;
};

const SORT: {
  key: 'price' | 'duration' | 'departure';
  value: number;
  text: string;
}[] = [
  {
    key: 'price',
    value: -1,
    text: 'Sort by Price (Low to High)',
  },
  {
    key: 'price',
    value: 1,
    text: 'Sort by Price (High to Low)',
  },
  {
    key: 'duration',
    value: -1,
    text: 'Sort by Duration (Shortest to Longest)',
  },
  {
    key: 'duration',
    value: 1,
    text: 'Sort by Duration (Longest to Shortest)',
  },
  {
    key: 'departure',
    value: -1,
    text: 'Sort by Departure Time (Earliest to Latest)',
  },
  {
    key: 'departure',
    value: 1,
    text: 'Sort by Departure Time (Latest to Earliest)',
  },
];

const Filters = ({filter, airlines = [], onApply, onDismiss}: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [sort, setSort] = useState(filter.sort);

  const [selectedAirline, setSelectedAirline] = useState<any>(filter.airlines);

  const addSort = (key: keyof typeof sort, value: number) => {
    if (sort[key] === value) {
      setSort({
        ...sort,
        [key]: 0,
      });
      return;
    }
    setSort({
      ...sort,
      [key]: value,
    });
  };

  const onApplyFilter = () => {
    onApply({
      sort,
      airlines: selectedAirline,
    });
    onDismiss();
  };

  const renderContent = () => {
    if (activeTabIndex === 0) {
      return (
        <View style={{marginTop: 10}}>
          {SORT.map((item, index) => {
            const active =
              sort[item.key] !== 0 && sort[item.key] === item.value;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sortItem,
                  {borderColor: active ? COLORS.BLUE : COLORS.GREY},
                ]}
                onPress={() => addSort(item.key, item.value)}>
                <Text
                  style={[
                    styles.sortText,
                    {color: active ? COLORS.BLUE : COLORS.BLACK},
                  ]}>
                  {item.text}
                </Text>
                <Text
                  style={[
                    styles.arrow,
                    {color: active ? COLORS.BLUE : COLORS.BLACK},
                  ]}>
                  {item.value < 0 ? '↓' : '↑'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    return (
      <View style={{marginTop: 10}}>
        {airlines.map((item, index) => {
          const active = selectedAirline[item.name];
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.airLines,
                {borderColor: active ? COLORS.BLUE : COLORS.GREY},
              ]}
              onPress={() =>
                setSelectedAirline(
                  selectedAirline[item.name]
                    ? {
                        ...selectedAirline,
                        [item.name]: !selectedAirline[item.name],
                      }
                    : {...selectedAirline, [item.name]: true},
                )
              }>
              <Text
                style={[
                  styles.sortText,
                  {color: active ? COLORS.BLUE : COLORS.BLACK},
                ]}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: FONT_SIZES['2xl'],
                  fontWeight: 'bold',
                  color: active ? COLORS.BLUE : COLORS.BLACK,
                }}>
                {item.length}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity onPress={onDismiss}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.filter}>
        <CustomTabs
          activeTabIndex={activeTabIndex}
          onTabPress={setActiveTabIndex}
          tabs={['Sort By', 'Filter']}
        />
        {renderContent()}
      </View>
      <PrimaryButton
        text="Apply"
        style={{
          width: WIDTH * 0.9,
          marginBottom: 20,
        }}
        onPress={onApplyFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT * 0.9,
    width: WIDTH,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  filter: {
    flex: 1,
  },
  title: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES['4xl'],
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 14,
  },
  divider: {
    width: WIDTH,
    marginBottom: 14,
    height: 1,
    backgroundColor: COLORS.GREY,
  },
  close: {
    color: COLORS.RED,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  sortItem: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortText: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  airLines: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZES['5xl'],
    position: 'absolute',
    right: 14,
    top: -2,
    fontWeight: 'bold',
  },
});

export default Filters;
