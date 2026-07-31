import {
  View,
  Text,
  NativeEventEmitter,
  DeviceEventEmitter,
  NativeModules,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

import { Tabs } from 'react-native-collapsible-tab';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CreationPage from './Creation';
import PrivatePage from './Private';
import CollectPage from './Collect';
import { useEffect, useMemo } from 'react';

import CollapsibleTabBar from '@/components/CollapsibleTabBar';

import Animated from 'react-native-reanimated';
import { PlatformPressable } from '@react-navigation/elements';

import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackHeaderItem } from '@react-navigation/native-stack';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        // backgroundColor: 'red',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
      }}
    >
      <PlatformPressable onPress={() => navigation.navigate('avatar')}>
        <Animated.Image
          sharedTransitionTag="avatar"
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
          }}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlJRZRHqSnieh35vCJHtsDhFh2Lxjj9Ol3bxhRCCnf7dZayOFD06llT088&s=10',
          }}
        />
      </PlatformPressable>

      <PlatformPressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'blue',
          paddingVertical: 10,
          columnGap: 5,
        }}
      >
        <Text>幸福生活</Text>
        <Ionicons name="arrow-forward-outline" color={'#ccc'} size={20} />
      </PlatformPressable>

      <Text style={{ color: '#999' }}>豆包号: 123456789</Text>

      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor: '#ddd',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 5,
          marginVertical: 12,
        }}
      >
        <Text>编辑个人资料</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function MinePage() {
  const navigation = useNavigation();

  useFocusEffect(() => {
    navigation.getParent()?.setOptions({
      title: '',
      headerRight: () => {
        return (
          <View
            style={{
              // width: 100,
              // height: 100,
              flexDirection: 'row',
              columnGap: 30,
            }}
          >
            <PlatformPressable
              onPress={() => {
                Alert.alert('点击了收藏按钮');
              }}
            >
              <Ionicons size={25} name="heart-outline" />
            </PlatformPressable>

            <PlatformPressable
              onPress={() => {
                Alert.alert('点击了设置按钮');
              }}
            >
              <Ionicons size={25} name="cog-outline" />
            </PlatformPressable>
          </View>
        );
      },

      unstable_headerRightItems: (): NativeStackHeaderItem[] => {
        return [
          {
            type: 'custom',
            element: (
              <PlatformPressable
                onPress={() => {
                  Alert.alert('点击了收藏按钮');
                }}
              >
                <Ionicons size={25} name="heart-outline" />
              </PlatformPressable>
            ),
            hidesSharedBackground: true,
          },

          {
            type: 'custom',
            element: (
              <PlatformPressable
                style={{
                  width:
                    parseFloat(Platform.Version.toString()) > 26 ? 'auto' : 44,
                  alignItems: 'flex-end',
                }}
                onPress={() => {
                  Alert.alert('点击了设置按钮');
                }}
              >
                <Ionicons size={25} name="cog-outline" />
              </PlatformPressable>
            ),
            hidesSharedBackground: true,
          },
        ];
      },
    });

    return () => {
      navigation.getParent()?.setOptions({
        title: '',
        headerRight: undefined,
        unstable_headerRightItems: undefined,
      });
    };
  });

  useEffect(() => {}, []);

  return (
    <Tabs.Container
      lazy
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
        <CollectPage />
      </Tabs.Tab>
    </Tabs.Container>
  );
}
