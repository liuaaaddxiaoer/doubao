import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { TabFlashList as FlashList } from 'react-native-collapsible-tab/flash-list';

const CellItem = ({ index, columnCount }) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const h = Math.floor(Math.random() * 51) + 100;
  const { width } = useWindowDimensions();
  const cellW = width / columnCount;

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
  const columnCount = 3;

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
      numColumns={columnCount}
      renderItem={({ index }) => {
        return <CellItem index={index} columnCount={columnCount} />;
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
