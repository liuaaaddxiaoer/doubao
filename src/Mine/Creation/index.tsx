import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Alert,
  Image as OriginalImage,
} from 'react-native';
import Image from 'react-native-fast-image';
import { TabFlashList as FlashList } from 'react-native-collapsible-tab/flash-list';

import { getAllCreations } from '@/http/mine';
import { PlatformPressable } from '@react-navigation/elements';
import Ionicons from '@react-native-vector-icons/ionicons';
import { save } from '@/utils/cameraRoll';
import Toast, { ToastAnimationConfig } from 'react-native-toast-message';

import { MyToast } from '@/components/Toast';
import { HUD } from '@/components/HUD';

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
          height: cellH,
          position: 'relative',
        },
      ]}
    >
      <Image
        source={{ uri: value }}
        resizeMode="contain"
        onLoad={e => {
          const { width, height } = e.nativeEvent;
          console.log('img height width', width, height);
          // imgLoadedCallBack(value, { width, height });
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      <PlatformPressable
        onPress={() => {
          save(value);
        }}
        style={[
          StyleSheet.absoluteFill,
          {
            left: 'auto',
            top: 'auto',
            bottom: 5,
            right: 5,
          },
        ]}
      >
        <Ionicons name="download" size={30} color={'white'} />
      </PlatformPressable>
    </View>
  );
};

interface CreationPageProps {
  viewWillAppear: boolean;
}

export default function CreationPage({ viewWillAppear }: CreationPageProps) {
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
    HUD.show();
  }, []);

  useEffect(() => {
    if (viewWillAppear) {
      loadData();
    }
  }, [viewWillAppear]);

  const loadData = useCallback(async () => {
    console.log('开始请求作品数据');

    const [error, datas] = await getAllCreations();
    if (error) {
      MyToast.show(error.message || '发生错误');
      HUD.hide();
    } else if (datas) {
      const uniqueImgs = [...new Set(datas!.data)];

      const imageSize = await Promise.all(
        uniqueImgs.map(async value => {
          try {
            const size = (await OriginalImage.getSize(
              value,
            )) as ImageLayoutInfo;
            return [value, size];
          } catch (error) {
            return [value, { width: 1, height: 200 }];
          }
        }),
      );
      setImageSizeMap(Object.fromEntries(imageSize));
      setData(uniqueImgs);
      HUD.hide();
    }
  }, []);

  return (
    <FlashList
      data={data}
      bounces={false}
      masonry
      drawDistance={300}
      numColumns={columnCount}
      // optimizeItemArrangement
      // removeClippedSubviews={false}
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
