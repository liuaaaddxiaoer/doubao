import {
  View,
  Text,
  NativeEventEmitter,
  DeviceEventEmitter,
  NativeModules,
} from 'react-native';

import { Tabs } from 'react-native-collapsible-tab';

import CreationPage from './Creation';
import PrivatePage from './Private';
import { useMemo } from 'react';

import CollapsibleTabBar from '@/components/CollapsibleTabBar';

const Header = () => {
  return (
    <View
      style={{
        height: 200,
        backgroundColor: 'red',
        width: '100%',
      }}
    >
      <Text>header1</Text>
    </View>
  );
};

export default function MinePage() {
  const data = useMemo(() => {
    return Array.from({ length: 4 }).map((value, index) => {
      return {
        id: index + '',
        label: index + '',
      };
    });
  }, []);

  return (
    <Tabs.Container
      renderHeader={Header}
      renderTabBar={props => <CollapsibleTabBar {...props} />}
    >
      <Tabs.Tab name="作品">
        <CreationPage />
      </Tabs.Tab>

      <Tabs.Tab name="私密">
        <PrivatePage />
      </Tabs.Tab>
      <Tabs.Tab name="喜欢">
        <Tabs.FlatList
          data={data}
          automaticallyAdjustsScrollIndicatorInsets={false}
          renderItem={() => <Text>111222</Text>}
          keyExtractor={item => {
            return item.id;
          }}
        ></Tabs.FlatList>
      </Tabs.Tab>
    </Tabs.Container>
  );
}
