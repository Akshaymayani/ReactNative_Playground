import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { Dimensions, StyleSheet } from 'react-native';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

import React from 'react';

const { width, height } = Dimensions.get('screen');

function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
}

const DragElement = React.memo(() => {
    const rotation = useSharedValue(0);
    const savedRotation = useSharedValue(0);
    const scale = useSharedValue(1);
    const startScale = useSharedValue(1);

    // Pan Gestures
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);
    const isPinchingOrRotating = useSharedValue(false);

    const PinchGesture = Gesture.Pinch()
        .onStart(() => {
            startScale.value = scale.value;
            isPinchingOrRotating.value = true; // Set the flag when pinch starts
        })
        .onUpdate((event) => {
            scale.value = clamp(
                startScale.value * event.scale,
                0.5,
                Math.min(width / 100, height / 100)
            );
        })
        .onEnd(() => {
            isPinchingOrRotating.value = false; // Reset the flag when pinch ends
        }).runOnJS(true);

    const RotationGesture = Gesture.Rotation()
        .onUpdate((e) => {
            rotation.value = savedRotation.value + e.rotation;
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
            isPinchingOrRotating.value = false; // Reset the flag when rotation ends
        }).runOnJS(true);

    const PanGesture = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            if (!isPinchingOrRotating.value) { // Only allow pan if not pinching/rotating
                prevTranslationX.value = translationX.value;
                prevTranslationY.value = translationY.value;
            }
        })
        .onUpdate((event) => {
            if (!isPinchingOrRotating.value) { // Only update if not pinching/rotating
                const maxTranslateX = width - 50;
                const maxTranslateY = height - 50;
                translationX.value = clamp(
                    prevTranslationX.value + event.translationX,
                    -maxTranslateX,
                    maxTranslateX
                );
                translationY.value = clamp(
                    prevTranslationY.value + event.translationY,
                    -maxTranslateY,
                    maxTranslateY
                );
            }
        }).runOnJS(true);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translationX.value },
            { translateY: translationY.value },
            { rotateZ: `${(rotation.value / Math.PI) * 180}deg` },
            { scale: scale.value },
        ],
    }));

    const composedGesture = Gesture.Simultaneous(PinchGesture, RotationGesture, PanGesture);

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={composedGesture}>
                <Animated.View style={[styles.box, animatedStyle]} />
            </GestureDetector>
        </GestureHandlerRootView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#b58df1',
    },
});

export default DragElement;
