import { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Alert,
} from 'react-native';
import Image from 'react-native-fast-image';
import { TabFlashList as FlashList } from 'react-native-collapsible-tab/flash-list';

import { getAllCreations } from '@/http/mine';
import { PlatformPressable } from '@react-navigation/elements';
import Ionicons from '@react-native-vector-icons/ionicons';

const CellItem = ({
  index,
  columnCount,
  value,
  cellW,
}: {
  index: number;
  columnCount: number;
  value: string;
  cellW: number;
}) => {
  return (
    <View
      style={[
        styles.itemContainer,
        {
          // width: cellW,
          height: cellW,
        },
      ]}
    >
      {index == 0 ? (
        <PlatformPressable
          style={{
            alignItems: 'center',
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            backgroundColor: '#ddd',
          }}
        >
          <Ionicons name="add-outline" size={30} />
          <Text>创建分身</Text>
        </PlatformPressable>
      ) : (
        <Image
          source={{ uri: value }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </View>
  );
};

export default function PrivatePage() {
  const columnCount = 3;
  const { width } = useWindowDimensions();
  const cellW = width / columnCount;
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const [error, datas] = await getAllCreations();
      if (error) {
        console.log(error);
        Alert.alert(error.message || '发生错误');
      } else if (datas) {
        const uniqueImgs = [...new Set(datas!.data)];
        setData(uniqueImgs);
      }
    })();
  }, []);

  return (
    <FlashList
      data={data}
      bounces={false}
      numColumns={columnCount}
      renderItem={({ item, index }) => {
        return (
          <CellItem
            index={index}
            value={item}
            columnCount={columnCount}
            cellW={cellW}
          />
        );
      }}
      keyExtractor={(item, index) => {
        return item;
      }}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});
