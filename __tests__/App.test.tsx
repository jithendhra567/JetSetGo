/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import PrimaryButton from '../src/components/PrimaryButton';
import {CustomTabs} from '../src/components/CustomTabs';

test('primay button renders correctly', () => {
  const buttontree = renderer
    .create(<PrimaryButton text="test" onPress={() => {}} />)
    .toJSON();
  expect(buttontree).toMatchSnapshot();
});

test('custom tabs renders correctly', () => {
  const tabs = renderer
    .create(
      <CustomTabs
        tabs={['test', 'test2']}
        onTabPress={() => {}}
        activeTabIndex={0}
      />,
    )
    .toJSON();
  expect(tabs).toMatchSnapshot();
});
