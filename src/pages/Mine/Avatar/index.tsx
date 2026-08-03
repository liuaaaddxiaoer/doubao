import { PlatformPressable } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AvatarPage() {
  const navigation = useNavigation();

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
