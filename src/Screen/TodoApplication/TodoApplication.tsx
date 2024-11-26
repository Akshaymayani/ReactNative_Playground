import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import image from '../../assets/images/todo.png';

const IMAGE = Image.resolveAssetSource(image).uri;

const TodoApplication = ({ navigation }: any) => {
  const { width } = useWindowDimensions();

  const handlePress = () => {
    navigation.navigate('TodoDrawer');
  };

  const styles = StyleSheet.create({
    gradient: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 16,
    },
    imageContainer: {
      alignItems: 'center', 
      justifyContent: 'center',
      flex: 1,
      marginTop: 40,
    },
    contentContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 16,
    },
    descContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginBottom: 40,
    },
    image: {
      marginBottom: 16,
      width: 400,
      height: 400,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 16,
    },
    button: {
      width: width - 80,
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: '#414a76',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 15,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <LinearGradient
      colors={['#8294ED', '#fff']}
      style={styles.gradient}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: IMAGE }}
          style={styles.image}
          resizeMode="contain"
          onLoad={() => {
            console.log('Image Loaded...');
          }}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.descContainer}>
          <Text style={styles.title}>Welcome to Todo List</Text>
          <Text style={styles.description}>
            This is an amazing todo app where you can store anything just like your notes.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Let's Start</Text>
            <FontAwesome5Icon name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default TodoApplication;
