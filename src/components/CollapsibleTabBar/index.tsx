import { PlatformPressable } from '@react-navigation/elements';
import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import type { TabBarRenderProps } from 'react-native-collapsible-tab';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface TabBarItemProps {
  title: string;
  isFocused: boolean;
  onTabPress(name: string): void;
}

const TabBarItem = ({ title, isFocused, onTabPress }: TabBarItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <PlatformPressable
        onPress={() => {
          onTabPress(title);
        }}
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
          StyleSheet.absoluteFill,
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: isFocused ? 'black' : '#999',
              fontWeight: isFocused ? 'regular' : 'medium',
            },
          ]}
        >
          {title}
        </Text>
      </PlatformPressable>
    </View>
  );
};

export default function TabBar(props: TabBarRenderProps) {
  const { tabNames, focusedTab, onTabPress, activeIndex, indexDecimal } = props;

  const tabW = Dimensions.get('window').width / tabNames.length;
  console.log(indexDecimal.get());
  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: indexDecimal.value * tabW,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {tabNames.map((value, index) => (
        <TabBarItem
          title={value}
          isFocused={activeIndex === index}
          onTabPress={onTabPress}
          key={index}
        />
      ))}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabW,
          },
          indicatorStyle,
        ]}
      ></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'stretch',
    borderBottomColor: '#999',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
  },
  indicator: {
    height: 2,
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
  },
});
