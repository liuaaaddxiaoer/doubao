import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import Image from 'react-native-fast-image';
import { TabFlashList as FlashList } from 'react-native-collapsible-tab/flash-list';

import { getAllCreations } from '@/http/mine';
import { PlatformPressable } from '@react-navigation/elements';
import Ionicons from '@react-native-vector-icons/ionicons';

type ImageLayoutInfo = {
  width: number;
  height: number;
};

const CellItem = ({
  index,
  columnCount,
  value,
  cellW,
  imgLoadedCallBack,
  imageSizeMap,
}: {
  index: number;
  columnCount: number;
  value: string;
  cellW: number;
  imgLoadedCallBack: (url: string, info: ImageLayoutInfo) => void;
  imageSizeMap: Record<string, ImageLayoutInfo>;
}) => {
  const sizeInfo = imageSizeMap[value];
  const cellH = useMemo(() => {
    if (!sizeInfo) return 200;
    const ratio = sizeInfo.width / sizeInfo.height;
    return cellW / ratio;
  }, [sizeInfo, cellW]);

  return (
    <View
      style={[
        styles.itemContainer,
        {
          // width: cellW,
          height: cellH,
        },
      ]}
    >
      (
      <Image
        // resizeMode=
        source={{ uri: value }}
        onLoad={e => {
          const { width, height } = e.nativeEvent;
          imgLoadedCallBack(value, { width, height });
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      )
    </View>
  );
};

export default function CreationPage() {
  const { width, height } = useWindowDimensions();
  const columnCount = width > height ? 4 : 2;
  const cellW = width / columnCount;
  const [data, setData] = useState<string[]>([]);

  const [imageSizeMap, setImageSizeMap] = useState<
    Record<string, ImageLayoutInfo>
  >({});

  // 更新图片尺寸缓存，使用函数式更新避免闭包问题
  const setImageSize = useCallback((url: string, size: ImageLayoutInfo) => {
    setImageSizeMap(prev => ({
      ...prev,
      [url]: size,
    }));
  }, []);

  useEffect(() => {
    (async () => {
      const datas = await getAllCreations();
      console.log(datas);
      const uniqueImgs = [...new Set(datas.data)];
      setData(uniqueImgs);
    })();
  }, []);

  return (
    <FlashList
      data={data}
      bounces={false}
      masonry
      numColumns={columnCount}
      renderItem={({ item, index }) => {
        return (
          <CellItem
            index={index}
            value={item}
            columnCount={columnCount}
            cellW={cellW}
            imageSizeMap={imageSizeMap}
            imgLoadedCallBack={setImageSize}
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
