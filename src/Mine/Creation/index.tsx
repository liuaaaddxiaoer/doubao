import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { TabFlashList as FlashList } from 'react-native-collapsible-tab/flash-list';

const CellItem = ({ index }) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const { width } = useWindowDimensions();
  const cellW = width / 3;
  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: `rgb(${r},${g}, ${b})`,
          width: cellW,
          height: cellW,
        },
      ]}
    >
      <Text>{index}</Text>
    </View>
  );
};

export default function CreationPage() {
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
      masonry={true}
      numColumns={3}
      renderItem={({ index }) => {
        return <CellItem index={index} />;
      }}
      keyExtractor={item => {
        return item.id;
      }}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
