/* eslint-disable react-native/no-inline-styles */
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Easing } from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MotiView } from 'moti';
import React from 'react';

const CircleSpreadAnimation = () => {
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <View style={{width:70,height:70,backgroundColor:'#577aa8',borderRadius:50,zIndex:1,justifyContent:'center',alignItems:'center'}}>
        <MaterialIcons
        name="wifi-calling-3"
        size={45}
        color="#c9d3df"
        />
      {[...Array(3).keys()].map((item,index) =>{
        return(
            <MotiView
            key={index}
            from={{opacity:1,scale:1}}
            animate={{opacity:0,scale:4.5}}
            transition={{
                type:'timing',
                duration:2000,
                easing:Easing.out(Easing.ease),
                loop:true,
                repeatReverse:false,
                delay: index * 400,
            }}
            style={[StyleSheet.absoluteFillObject,styles.dot]}
             />
        );
      })}
      </View>
    </View>
   </SafeAreaView>
  );
};

export default CircleSpreadAnimation;


const styles = StyleSheet.create({
    dot:{
        width:70,
        height:70,
        borderRadius:50,
        backgroundColor:'#6787b1',
        justifyContent:'center',
        alignItems:'center',
        zIndex:-1,
    },
});
