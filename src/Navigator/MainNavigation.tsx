import ChatLayout from '../Screen/ChatApp/ChatLayout';
import CircleSpreadAnimation from '../Screen/CircleSpreadAnimation';
import CountDown from '../Screen/CountDown';
import DetailsScreen from '../Screen/SharedElement/DetailsScreen';
import DragElement from '../Screen/DragElement';
import DrawerScreen from '../Screen/TodoApplication/DrawerScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomePage from '../Screen/HomePage';
import HomeScreen from '../Screen/SharedElement/HomeScreen';
import LayoutAnimation from '../Screen/LayoutAnimation';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationPath } from './NavigationPath';
import React from 'react';
import TodoApplication from '../Screen/TodoApplication/TodoApplication';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={NavigationPath.Home} component={HomePage} options={{ headerTitle: 'ReactNative Playground' }} />
          <Stack.Screen name={NavigationPath.CallerAnimation} component={CircleSpreadAnimation} />
          <Stack.Screen name={NavigationPath.LayoutAnimation} component={LayoutAnimation} />
          <Stack.Screen name={NavigationPath.TodoApp} component={TodoApplication} />
          <Stack.Screen name={NavigationPath.TodoDrawer} component={DrawerScreen} options={{ headerShown: false }} />
          <Stack.Screen name={NavigationPath.DragElement} component={DragElement} />
          <Stack.Screen name={NavigationPath.ChatApp} component={ChatLayout} />
          <Stack.Screen name={NavigationPath.HomeScreen} component={HomeScreen} />
          <Stack.Screen name={NavigationPath.DetailScreen} component={DetailsScreen}
            options={{
              headerShown: false,
              presentation: 'transparentModal',
              animation: 'fade',
            }} />
          <Stack.Screen name={NavigationPath.CountDown} component={CountDown} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default MainNavigation;

