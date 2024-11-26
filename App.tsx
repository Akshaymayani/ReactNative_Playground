// import { ThemeProvider, useTheme } from 'react-native-paper';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import MainNavigation from './src/Navigator/MainNavigation';
import React from 'react';
import TodoContext from './src/Context/TodoProvider';
import { useColorScheme } from 'react-native';

// prettier-ignore

const App = () => {
  // const theme = useTheme();
  const colorScheme = useColorScheme();
  return (
    // <ThemeProvider theme={theme}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TodoContext>
        <MainNavigation />
      </TodoContext>
      </ThemeProvider>
    // </ThemeProvider>
  );
};

export default App;
