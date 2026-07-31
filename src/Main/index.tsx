import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversationPage from '@/Conversation';
import CreatePage from '@/Create';
import CloudDishPage from '@/CloudDisk';
import MinePage from '@/Mine';
import Ionicons, {
  type IoniconsIconName,
} from '@react-native-vector-icons/ionicons';
import { View, Text, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AvatarPage from '@/Mine/Avatar';
import { PlatformPressable } from '@react-navigation/elements';
import { StatusBar } from 'react-native';

const conversation = 'conversation';
const create = 'create';
const cloudDisk = 'cloudDisk';
const mine = 'mine';

type RouteName =
  | typeof conversation
  | typeof create
  | typeof cloudDisk
  | typeof mine;

type ItemConfigType = {
  iconName: IoniconsIconName;
  focusedIconName: IoniconsIconName;
  title: string;
};

const config: Record<RouteName, ItemConfigType> = {
  [conversation]: {
    iconName: 'chatbubble-outline',
    focusedIconName: 'chatbubble',
    title: '对话',
  },

  [create]: {
    iconName: 'create-outline',
    focusedIconName: 'create',
    title: '创作',
  },

  [cloudDisk]: {
    iconName: 'file-tray-outline',
    focusedIconName: 'file-tray',
    title: '云盘',
  },

  [mine]: {
    iconName: 'person-outline',
    focusedIconName: 'person',
    title: '我的',
  },
};

const RootTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => {
    return {
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        const itemConfig = config[route.name as RouteName];
        if (!focused) {
          return <Ionicons name={itemConfig.iconName} size={20} />;
        } else {
          return <Ionicons name={itemConfig.focusedIconName} size={20} />;
        }
      },

      tabBarLabel: () => {
        const itemConfig = config[route.name as RouteName];
        return (
          <Text
            style={{
              fontSize: 13,
            }}
          >
            {itemConfig.title}
          </Text>
        );
      },
    };
  },
  screens: {
    [mine]: MinePage,
    [conversation]: ConversationPage,
    [create]: CreatePage,
    [cloudDisk]: CloudDishPage,
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShadowVisible: false,
    title: '',
  },
  screens: {
    main: {
      screen: RootTabs,
    },
    avatar: {
      screen: AvatarPage,
      options: {},
    },
    avatar2: AvatarPage,
  },

  groups: {
    modal: {
      screenOptions: {
        // presentation: 'modal',
        // animation: 'none',
      },
      screens: {},
    },
  },
});
const Navigation = createStaticNavigation(RootStack);

export default function MainPage() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <StatusBar barStyle={'dark-content'} />
        <Navigation />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
