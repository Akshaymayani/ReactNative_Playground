import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import MaterialIcons  from 'react-native-vector-icons/MaterialIcons'; // Ensure you have the correct import
// CustomHeader.js
import React from 'react';

const CustomHeader = ({ navigation, title }:any) => {
    const {width} = useWindowDimensions();
    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
            borderRadius:8,
            backgroundColor: '#4E6E97',
            width:width - 20,
            marginBottom:8,
        },
        title: {
            fontSize: 18,
            color: '#fff',
            fontWeight: 'bold',
        },
    });
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialIcons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity>
                <MaterialIcons name="notifications" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};


export default CustomHeader;
