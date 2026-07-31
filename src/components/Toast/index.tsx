import { Text, View, StyleSheet } from 'react-native';
import ShadowComponent from '../Shadow';
import Animated from 'react-native-reanimated';
import { useCallback, useEffect, useRef, useState } from 'react';

type MyToastParams = {
  show: (message: string, duration: number) => void;
  hide: () => void;
};

let controller: MyToastParams | null = null;

export const MyToast = {
  show: (message: string, duration = 2000) => {
    if (!controller) return;
    (controller as MyToastParams).show(message, duration);
  },
  hide: () => {
    if (!controller) return;
    (controller as MyToastParams).hide();
  },
};

export default function ToastView() {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0);
  const timerRef = useRef<number | null>(null);
  const [message, setMessage] = useState('');

  const show = useCallback((message: string, duration: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage(message);
    setOpacity(1);
    setScale(1);
    timerRef.current = setTimeout(() => {
      setOpacity(0);
      setScale(0);
    }, duration);
  }, []);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage('');
    setOpacity(0);
    setScale(0);
  }, []);

  useEffect(() => {
    controller = { show, hide };
    return () => {
      controller = null;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show, hide]);

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity: opacity,
          transitionDuration: 300,
          transitionProperty: 'all',
          transform: [
            {
              scale: scale,
            },
          ],
        },
      ]}
      pointerEvents="none"
    >
      <ShadowComponent offset={[0, 3]} distance={5}>
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </ShadowComponent>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    // backgroundColor: 'red',
    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 5,
    elevation: 60,
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});
