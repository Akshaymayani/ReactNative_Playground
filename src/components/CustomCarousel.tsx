import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
// ParallaxCarousel.js
import React from 'react';

const CustomCarousel = () => {
    const images = [
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9',
        'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9',
        'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    ];
    const windowWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical:10,
            borderRadius:10,
        },
        carouselItem: {
            position:'relative',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:10,
            overflow:'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
            borderRadius: 10,
        },
        caption: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            color: '#fff',
            fontSize: 18,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            paddingVertical: 10,
            paddingHorizontal:20,
            borderRadius: 5,
        },
    });


    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={windowWidth - 30}
                height={windowWidth / 2} // Adjust height as needed
                // autoPlay={true}
                data={images}
                renderItem={({ item, index }) => (
                    <View style={styles.carouselItem}>
                        <Image
                            source={{ uri: item }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.caption}>Image {index + 1}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default CustomCarousel;
