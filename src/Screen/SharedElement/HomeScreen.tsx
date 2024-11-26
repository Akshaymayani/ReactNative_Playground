import Animated,{ useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import { NavigationPath } from '../../Navigator/NavigationPath';
import React from 'react';

const HomeScreen = ({ navigation }: any) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
      return {
          transform: [{ scale: scale.value }],
      };
  });

  const handlePressIn = () => {
      scale.value = withSpring(0.85);
  };

  const handlePressOut = () => {
      scale.value = withSpring(1);
  };

  function handleClick(): void {
    console.log('clicked');
    navigation.navigate(NavigationPath.DetailScreen);
  }

  return (
    <View style={styles.container}>
       <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => handleClick()}
                activeOpacity={0.9}
            >
                <Animated.View
                    style={[styles.btnwrapper, animatedStyle]}>
                    <Animated.Text style={[styles.btnText]}>
                        Open Modal
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3d2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnwrapper: {
    paddingVertical: 7,
    borderRadius: 5,
},
btnText: {
    fontSize: 26,
    color: '#000',
    textAlign: 'center',
    fontFamily:"arial",
    fontWeight:'500'
},
});
