/* eslint-disable react-native/no-inline-styles */
import Animated, { BounceInLeft, SlideInDown, SlideOutLeft } from 'react-native-reanimated';
import { Button, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import React, { useMemo, useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { TextInput } from 'react-native-paper';

const BottmSheetAddTodo = ({ onClose, onSubmit }: any) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<any>({
        defaultValues:{
            Title:'',
            Description:'',
            Category:'',
            Completed:false,
        },
    });
    const { width, height } = useWindowDimensions();
    const [categoryOpen, setCategoryOpen] = useState(false);

    const handleFormSubmit = (data: any) => {
        // Call the provided onSubmit function
        onSubmit(data);
        // Reset the form fields
        reset();
        clearErrors('Category');
    };
    const categories = useMemo(()=>{
        return [
        { label: 'Work', value: 'work' },
        { label: 'Personal', value: 'personal' },
        { label: 'Study', value: 'study' },
        { label: 'Important', value: 'important' },
        { label: 'Career', value: 'career' },
        { label: 'Daily', value: 'daily' },
    ];
    },[]);

    const styles = StyleSheet.create({
        OuterContainer: {
            height,
            width,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        ModalContainer: {
            position: 'relative',
            minHeight: 400,
            width: '98%',
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            padding: 20,
            justifyContent: 'center',
            marginVertical: 4,
        },
        Header: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        CloseButton: {
            position: 'absolute',
            top: 20,
            right: 20,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
        },
        DropDownPickerContainer: {
            height: 40,
            marginBottom: 10,
            zIndex: 19999,
        },
        DropDownStyle: {
            backgroundColor: '#ffffff',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
        },
        DropDownLabel: {
            color: '#333',
            fontSize: 16,
        },
        DropDownItemStyle: {
            justifyContent: 'flex-start',
        },
        DropDownSelectedStyle: {
            backgroundColor: '#e0f7fa',
        },
        contentContainer: {
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        itemContainer: {
            padding: 6,
            margin: 6,
            backgroundColor: '#eee',
        },
        headerContainer: {
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
        },
        handle: {
            width: 90,
            height: 5,
            borderRadius: 5,
            backgroundColor: 'black',
        },
    });
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.contentContainer}>
            <ScrollView
                onScrollBeginDrag={() => Keyboard.dismiss()}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <Animated.View
                    style={styles.ModalContainer}
                    entering={SlideInDown}
                >
                    <TouchableOpacity style={styles.CloseButton} onPress={onClose}>
                        <Fontisto name="close-a" size={17} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.Header}>Add Your New Todo</Text>

                    <View style={{ rowGap: 8 }}>
                        <Controller
                            control={control}
                            name="Title"
                            rules={{ required: 'Title is required.' }}
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <>
                                    <TextInput
                                        label="Title of Todo"
                                        placeholder="Enter the Title of Todo"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        mode="outlined"
                                        style={{ width: '100%' }}
                                        error={!!errors.Title}
                                    />
                                    {error && (
                                        <Animated.View
                                            entering={BounceInLeft}
                                            exiting={SlideOutLeft}
                                        >
                                            <Text style={{ color: 'red' }}>{error.message}</Text>
                                        </Animated.View>
                                    )}
                                </>
                            )}
                        />
                        <Controller
                            control={control}
                            name="Description"
                            rules={{ required: 'Description is required.' }}
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <>
                                    <TextInput
                                        label="Description of Todo"
                                        placeholder="Enter the Description of Todo"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        mode="outlined"
                                        style={{ width: '100%' }}
                                        error={!!errors.Description}
                                    />
                                    {error && (
                                        <Animated.View
                                            entering={BounceInLeft}
                                            exiting={SlideOutLeft}
                                        >
                                            <Text style={{ color: 'red' }}>{error.message}</Text>
                                        </Animated.View>
                                    )}
                                </>
                            )}
                        />

                        <Controller
                            control={control}
                            name="Category"
                            rules={{ required: 'Category is required.' }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <>
                                    <View style={styles.DropDownPickerContainer}>
                                    <DropDownPicker
                                            open={categoryOpen}
                                            value={value}
                                            items={categories}
                                            setOpen={setCategoryOpen}
                                            setValue={(val) => onChange(val)} // Properly set value
                                            setItems={() => { }}
                                            onChangeValue={(val) => onChange(val)}
                                            placeholder="Select Category"
                                            containerStyle={{ height: 40 }}
                                            dropDownContainerStyle={styles.DropDownStyle}
                                            labelStyle={styles.DropDownLabel}
                                            selectedItemLabelStyle={{ color: '#007AFF' }}
                                            selectedItemContainerStyle={styles.DropDownSelectedStyle}
                                        />
                                    </View>
                                    {error && (
                                        <Animated.View
                                            entering={BounceInLeft}
                                            exiting={SlideOutLeft}
                                        >
                                            <Text style={{ color: 'red' }}>{error.message}</Text>
                                        </Animated.View>
                                    )}
                                </>
                            )}
                        />

                        <Controller
                            control={control}
                            name="Completed"
                            render={({ field: { onChange, value } }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={{ marginRight: 10 }}>Completed : </Text>
                                    <Switch
                                        value={value}
                                        onValueChange={onChange}
                                    />
                                </View>
                            )}
                        />

                        <View>
                            <Button title="Add Todo" onPress={handleSubmit(handleFormSubmit)} />
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default BottmSheetAddTodo;
