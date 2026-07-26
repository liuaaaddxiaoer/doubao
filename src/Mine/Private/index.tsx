import { useMemo } from 'react';
import { View, Text } from 'react-native';
import { TabFlashList as FlashList } from 'react-native-collapsible-tab/flash-list';

export default function PrivatePage() {
  const data = useMemo(() => {
    return Array.from({ length: 100 }).map((value, index) => {
      return {
        id: index + '',
        label: index + '',
      };
    });
  }, []);

  return (
    <FlashList
      data={data}
      renderItem={({ index }) => {
        return <Text>{index}</Text>;
      }}
      keyExtractor={item => {
        return item.id;
      }}
    />
  );
}
