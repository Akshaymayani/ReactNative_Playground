import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet } from 'react-native';

const transition = { duration: 200 } as const;

function HeightTransition({
  children,
  hide = !children,
  style,
  onHeightDidAnimate,
  initialHeight = 0,
}: any) {
  const measuredHeight = useSharedValue(initialHeight);
  const childStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(!measuredHeight.value || hide ? 0 : 1, transition),
    }),
    [hide, measuredHeight]
  );

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(hide ? 0 : measuredHeight.value, transition, () => {
         if (onHeightDidAnimate) {
           runOnJS(onHeightDidAnimate)(measuredHeight.value);
         }
      }),
    };
  }, [hide, measuredHeight]);

  return (
    <Animated.View style={[styles.hidden, style, containerStyle]}>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.autoBottom, childStyle]}
        onLayout={({ nativeEvent }) => {
          measuredHeight.value = Math.ceil(nativeEvent.layout.height);
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  autoBottom: {
    bottom: 'auto',
  },
  hidden: {
    // overflow: 'hidden',
    
  },
});

export { HeightTransition };
