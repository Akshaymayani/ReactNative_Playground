/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { Button, useTheme } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TodoDashboard from './TodoDashboard';

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
    function CustomDrawerContent(props:any) {
        const theme = useTheme();
        return (
            <DrawerContentScrollView
                {...props}
                style={styles.drawerContainer}
                contentContainerStyle={styles.drawerContent}
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/todo.png')} // Change this to your logo path
                        style={styles.logo}
                    />
                    <Text style={styles.logoText}>Akshay Mayani</Text>
                </View>
                <DrawerItemList {...props} />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            props.navigation.closeDrawer();
                            props.navigation.navigate('Home');
                        }}
                        icon={'logout'}
                        labelStyle={styles.buttonLabel}
                        style={styles.button}
                    >
                        Back
                    </Button>
                </View>
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
              drawerAllowFontScaling:true,
                drawerStyle: {
                    backgroundColor: '#4E6E97',
                },
                drawerLabelStyle: {
                    // color: 'white',
                    fontFamily:'arial',
                    fontSize:15,
                },
                drawerInactiveTintColor:'white',
                drawerActiveBackgroundColor: 'white',
                drawerActiveTintColor:'black',
            }}
        >
            <Drawer.Screen
                name="TodoDashboard"
                component={TodoDashboard}
                options={{
                    headerTitle: 'Todo Dashboard',
                    headerShown: false,
                    // drawerIcon:props => <MaterialIcons name="close" size={24} color="white"/>,
                  }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        backgroundColor: '#4E6E97',
    },
    drawerContent: {
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 130,
        height: 130,
        marginBottom: 10,
    },
    logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
      marginVertical:4,
    },
    button: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 10,
    },
    buttonLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
});
