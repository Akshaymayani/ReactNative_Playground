import * as React from 'react';

import { Image, Pressable, StyleSheet } from 'react-native';

import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native';
import { Text } from 'moti';
import image from '../../assets/images/chat_image.png';

const IMAGE = Image.resolveAssetSource(image).uri;
function DetailsScreen({navigation}:any) {
    return (
      <SafeAreaView style={styles.detailContainer}>
        <Pressable style={styles.ModalContainer} onPress={() => navigation.goBack()}>
        <Animated.Image source={{uri:IMAGE}} style={styles.image}  sharedTransitionTag="sharedTag"/>
        <Text>Description of the Modal</Text>
        </Pressable>
        </SafeAreaView>
    );
  }


  export default DetailsScreen;

const styles = StyleSheet.create({
    detailContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.6)',
    },
    ModalContainer:{
        width:'90%',
        height:300,
        backgroundColor:'#fff',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:20,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.5,
        shadowRadius:5,
        elevation:5,
    },
    image: {
        width: 200,
        height: 200,
      },
  });

