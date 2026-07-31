import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';
import { mainColor } from '@/utils/common';
import { useCallback, useEffect, useMemo, useState } from 'react';

type HUDComponentParams = {
  show: (message: string, maskTouchable: boolean) => void;
  hide: () => void;
};

let controller: HUDComponentParams | null = null;

export const HUD = {
  show: (message = 'Loading...', maskTouchable: boolean = false) => {
    if (!controller) return;
    (controller as HUDComponentParams).show(message, maskTouchable);
  },

  hide: () => {
    if (!controller) return;
    (controller as HUDComponentParams).hide();
  },
};

export default function HUDComponent() {
  const [opacity, setOpacity] = useState(0);
  const [message, setMessage] = useState('');
  const [animated, setAnimated] = useState(false);
  const [maskTouchable, setMaskTouchable] = useState(false);

  const show = useCallback((message: string, maskTouchable: boolean) => {
    setOpacity(1);
    setMessage(message);
    setAnimated(true);
    setMaskTouchable(maskTouchable);
  }, []);

  const pointerEvents = useMemo(() => {
    let events: 'box-none' | 'none' | 'box-only' | 'auto' = 'auto';
    if (maskTouchable) {
      events = 'none';
    } else {
      events = opacity === 1 ? 'auto' : 'none';
    }
    return events;
  }, [maskTouchable, opacity]);

  const hide = useCallback(() => {
    setOpacity(0);
    setMessage('');
    setAnimated(false);
  }, []);

  useEffect(() => {
    if (!controller) {
      controller = { show, hide };
    }
    return () => {
      controller = null;
    };
  }, [show, hide]);

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.hud]}
      pointerEvents={pointerEvents}
    >
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            display: opacity ? 'flex' : 'none',
            transitionProperty: 'opacity',
            transitionDuration: 300,
          },
        ]}
      >
        <ActivityIndicator color={mainColor} size={22} animating={animated} />
        <Text style={styles.title}>{message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  hud: {
    // backgroundColor: 'red',
    zIndex: 9999,
  },
  container: {
    rowGap: 5,
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    left: '50%',
    top: '45%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 12,
  },
  title: {
    color: 'white',
    fontSize: 14,
  },
});
