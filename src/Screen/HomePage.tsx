import Animated, { LinearTransition } from 'react-native-reanimated';
import { MotiText, MotiView } from 'moti';
/* eslint-disable react-native/no-inline-styles */
import { Pressable, SafeAreaView, StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import React, { useMemo } from 'react';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationPath } from '../Navigator/NavigationPath';

const iconLibraries:any = {
    MaterialIcons,
    Feather,
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,
};

const HomePage = ({ navigation }: any) => {
    const ProgramIndex = useMemo(()=>[
        {
            id: 1,
            title: 'Layout Animation',
            icon: 'layout',
            navigationPath: NavigationPath.LayoutAnimation,
            IconLib: 'Feather',
        },
        {
            id: 2,
            title: 'Caller Animation',
            icon: 'wifi-calling-3',
            navigationPath: NavigationPath.CallerAnimation,
            IconLib: 'MaterialIcons',
        },
        {
            id: 3,
            title: 'Todo Application',
            icon: 'tasks',
            navigationPath: NavigationPath.TodoApp,
            IconLib: 'FontAwesome5',
        },
        {
            id: 4,
            title: 'Drag-Move-Scale Box',
            icon: 'drag-indicator',
            navigationPath: NavigationPath.DragElement,
            IconLib: 'MaterialIcons',
        },
        {
            id: 6,
            title: 'Chat App',
            icon: 'wechat',
            navigationPath: NavigationPath.ChatApp,
            IconLib: 'FontAwesome',
        },
        {
            id: 7,
            title: 'SharedElement',
            icon: 'slideshare',
            navigationPath: NavigationPath.HomeScreen,
            IconLib: 'FontAwesome',
        },
        {
            id: 8,
            title: 'CountDown',
            icon: 'timer',
            navigationPath: NavigationPath.CountDown,
            IconLib: 'MaterialCommunityIcons',
        },
    ],[]);
    const scheme = useColorScheme();
    return (
        <>
        <StatusBar
          backgroundColor="transparent"
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
          translucent={true}
        />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <View style={{ flex: 1, marginHorizontal: 8 }}>
                <Animated.FlatList
                    data={ProgramIndex}
                    removeClippedSubviews={true}
                    initialNumToRender={5}
                    itemLayoutAnimation={LinearTransition.springify()
                        .damping(30)
                        .mass(5)
                        .stiffness(10)
                    }
                    renderItem={({ item }) => {
                        const IconComponent = iconLibraries[item.IconLib];

                        return (
                            <Pressable
                                style={{ width: '100%' }}
                                onPress={() => navigation.navigate(item.navigationPath)}>
                                <MotiView
                                    style={styles.container}
                                    animate={{
                                        backgroundColor:  '#4E6E97',
                                        scale: 1,
                                    }}
                                    transition={{ type: 'timing', duration: 200 }}>
                                    <MotiText
                                        style={[{ fontSize: 20, color: 'white' }]}
                                        from={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            delay: 100,
                                            duration: 500,
                                            type: 'spring',
                                        }}
                                    >
                                        {item.id}. {item.title}
                                    </MotiText>
                                    <MotiView
                                    from={{scale:0,opacity:0}}
                                    animate={{scale:1,opacity:1}}
                                    transition={{
                                        delay: 100,
                                        duration: 500,
                                        type: 'spring',
                                    }}>
                                    <IconComponent name={item.icon} size={20} color="#fff" />
                                    </MotiView>
                                </MotiView>
                            </Pressable>
                        );
                    }}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
        </>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 10,
        columnGap: 15,
    },
});
