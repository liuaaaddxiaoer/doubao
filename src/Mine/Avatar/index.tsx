import { PlatformPressable } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

import Animated, {
  BounceInRight,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FlipInEasyX,
  FlipInEasyY,
  FlipInXDown,
  FlipInYLeft,
  LightSpeedInLeft,
  LightSpeedInRight,
  PinwheelIn,
  RollInLeft,
  SharedTransition,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  withSpring,
  ZoomIn,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AvatarPage() {
  const navigation = useNavigation();

  // 可选：自定义弹簧动画效果（让过渡更自然）
  const transition = SharedTransition.duration(550).springify();

  useEffect(() => {
    navigation.setOptions({
      title: 'good',
      //   headerShown: false,
    });
  }, []);
  return (
    <Animated.View
      style={{
        backgroundColor: 'red',
        flex: 1,
      }}
    >
      <SafeAreaView>
        <Text
          onPress={() => {
            navigation.goBack();
          }}
        >
          avatar
        </Text>

        <PlatformPressable
          onPress={() => {
            navigation.navigate('avatar2');
          }}
        >
          <Animated.Image
            sharedTransitionTag="avatar"
            // sharedTransitionStyle={transition}
            style={{
              width: 300,
              height: 300,
            }}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlJRZRHqSnieh35vCJHtsDhFh2Lxjj9Ol3bxhRCCnf7dZayOFD06llT088&s=10',
            }}
          />
        </PlatformPressable>
      </SafeAreaView>
    </Animated.View>
  );
}
