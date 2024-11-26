/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { Alert, FlatList, Platform, StatusBar, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { GetAsyncData, SetAsyncData } from '../../AsyncStorage/ManipulateStorage';
// TodoDashboard.js
import React, { useCallback, useEffect, useState } from 'react';

import BottmSheetData from './BottmSheetAddTodo';
import BottomSheetModal from '../../components/BottomSheetModal';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
import CustomCarousel from '../../components/CustomCarousel';
import CustomHeader from '../../utility/CustomHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native';
import { TodoDashboardStyles } from '../../styles/TodoDashboardStyles';
import TodoItemInfo from './TodoItemInfo';
import useTodoList from '../../Hooks/useTodoList';

interface TodoData {
    id: number
    Category: string,
    Completed: boolean,
    Description: string,
    Title: string,
}

const TodoDashboard = ({ navigation }: any) => {
    const { TodoList, setTodoList } = useTodoList();
    const [checkedData, setCheckedData] = useState<any>({});
    const [visibleCheck, setVisibleCheck] = useState<boolean>(false);
    const [selectedTodo, setSelectedTodo] = useState<TodoData>();
    const [isVisible, setIsVisible] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const styles  = TodoDashboardStyles();
    // const openBottomSheet = () => {
    //   setIsVisible(true);
    // };
    const handleLongPress = () => {
        setVisibleCheck(!visibleCheck);
        setCheckedData({});
    };
    const closeBottomSheet = () => {
        setIsVisible(false);
    };
    const closeShowInfoSheet = () => {
        setShowInfo(false);
    };
    const handleSelectedItem = (id: number) => {
        setCheckedData((prev: Record<number, boolean>) => {
            return { ...prev, [id]: !prev[id] };
        });
    };
    const toggleTodo = (id: number) => {
        setTodoList((prev: TodoData[]) => {
            const todo = prev.map((item) => item.id === id ? { ...item, Completed: !item.Completed } : item);
            return todo;
        });
    };

    useEffect(()=>{console.log({checkedData});},[checkedData]);
    const renderItem = useCallback(({item,index}:any)=>{
        return(
            <View style={styles.taskContainer} key={`${item}${index}`}>
            <TouchableOpacity
                style={styles.task}
                activeOpacity={0.6}
                onLongPress={() => handleLongPress()}
                onPress={() => handleShowInfo(item)}
            >
                <View style={styles.taskIcon}>
                    {visibleCheck && (
                        <View style={{ flex: 1 }}>
                            <BouncyCheckBox
                                isChecked={checkedData[item.id] ? true : false}
                                onPress={() => handleSelectedItem(item.id)}
                                size={25}
                                fillColor="tomato"
                                unFillColor="#FFFFFF"
                                iconStyle={{ borderColor: 'tomato' }}
                                innerIconStyle={{ borderWidth: 2 }}
                                textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                            />
                        </View>
                    )}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><FontAwesome5 name="tasks" size={20} color="black" /></View>
                </View>
                <View style={styles.taskDetails}>
                    <Text numberOfLines={1} style={styles.taskTitle}>{item.Title}</Text>
                    <Text numberOfLines={1} style={styles.taskDescription}>{item.Description}</Text>
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => toggleTodo(item.id)}>
                        {item.Completed ?
                            <MaterialIcons name="task-alt" size={28} color="green" />
                            : <MaterialIcons name="pending-actions" size={28} color="orange" />
                        }
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
        );
    },[visibleCheck,TodoList]);

    const handleOpenDelete = () => {
        if (visibleCheck) {
            console.log('--------------------');
            console.log(checkedData);
            console.log(Object.keys(checkedData).length);
            console.log('--------------------');
            if (Object.values(checkedData).filter(item => item).length > 0) {

                Alert.alert(
                    'Delete Todo',
                    'Are you sure you want to delete Todos?',
                    [
                        {
                            text: 'No',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'Yes', onPress:handleDeleteTodo },
                    ],
                    { cancelable: false },
                );
            } else {
                Alert.alert('No Todo Selected', 'Please select a todo to delete', [
                    { text: 'Okay', onPress: () => console.log('Okay Pressed') },
                ],
                    { cancelable: false });
                return;
            }
            closeBottomSheet();
        } else {
            setIsVisible(true);
        }
    };

    const SubmitTodo = (data: any) => {
        console.log(data);
        setTodoList((prev: any) => {
            return [...prev, { id: prev.length + 1 || 0, ...data }];
        });
        setIsVisible(false);
        showMessage({
            message: 'success',
            description: 'Todo Added SuccessFully',
            type: 'success',
            icon: 'auto',
        });
    };
    const handleDeleteTodo = () => {
        console.log({ TodoList, checkedData });
        const updatedTodos = TodoList.filter((todo: TodoData) => !checkedData[todo.id]);
        setTodoList(updatedTodos);
        setCheckedData({});
        setVisibleCheck(false);
        showMessage({
            message: 'Delete',
            description: 'Todo Deleted SuccessFully',
            type: 'danger',
            icon: 'auto',
        });
    };
    const handleAllDeleteTodo = () => {
        setTodoList([]);
        setCheckedData({});
        setVisibleCheck(false);
    };

    const handleShowInfo = (item: TodoData) => {
        setShowInfo(true);
        setSelectedTodo(item);
    };

    useEffect(() => {
        const fetchTodos = async () => {
            const storedTodos = await GetAsyncData('TodoList');
            if (storedTodos) {
                setTodoList(storedTodos);
            } else {
                setTodoList([]);
            }
        };
        fetchTodos();
    }, []);

    useEffect(() => {
        (async () => {
            await SetAsyncData('TodoList', TodoList);
        })();
        console.log({ TodoList });
    }, [TodoList]);
    const scheme = useColorScheme();
    return (
        <LinearGradient
            colors={['#8294ED', '#fff']}
            style={{ flex: 1 }}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
        >
            <StatusBar
                backgroundColor="transparent"
                barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
                translucent={true}
            />
            <View style={[styles.container, Platform.OS === 'android' ? { marginTop: 40 } : Platform.OS === 'ios' ? { marginTop: 55 } : {}]}>
                <CustomHeader navigation={navigation} title="Todo Dashboard" />
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <CustomCarousel />
                    <View style={styles.section}>
                        <View style={styles.heading}>
                            <View><Text style={styles.headingText}>Your Todo List</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }} onPress={handleAllDeleteTodo}>
                                <Text style={{ fontSize: 16 }}>Clear All</Text>
                                <MaterialCommunityIcons name="delete-empty" size={25} color="black" />
                            </TouchableOpacity>
                        </View>
                        {TodoList.length > 0 ? (
                            <FlatList
                                data={TodoList}
                                keyExtractor={(item)=> item.id}
                                renderItem={renderItem}
                                removeClippedSubviews={true}
                                initialNumToRender={5}
                                onEndReachedThreshold={0.5}
                            />
                        )
                            :
                            (<View style={{height:200,width:'100%',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:20,fontWeight:500}}>No Data found</Text>
                            </View>
                            )
                        }
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={[styles.createButton, visibleCheck ?
                        { width: 55, height: 55 } :
                        { backgroundColor: 'transparent', width: 80, height: 80 }]}
                    activeOpacity={0.6}
                    onPress={handleOpenDelete}>
                    {/* <MaterialIcons name="add-task" size={25} color="#414a76" /> */}
                    {visibleCheck ? (
                        <MaterialCommunityIcons name="delete-sweep" size={30} color="#414a76" />
                    ) : (
                        <LottieView
                            style={{ width: '100%', height: '100%', borderColor: 'tomato' }}
                            source={require('../../assets/Add-Todo-Animation.json')}
                            autoPlay
                            loop
                            speed={0.5}
                        />
                    )
                    }
                </TouchableOpacity>
            </View>

            <BottomSheetModal
                visible={isVisible} onClose={closeBottomSheet}
                todoInfo={false}
            >
                <BottmSheetData
                    onClose={() => setIsVisible(false)}
                    onSubmit={SubmitTodo}
                />
            </BottomSheetModal>
            <BottomSheetModal
                visible={showInfo} onClose={closeShowInfoSheet}
                todoInfo={true}
            >
                <TodoItemInfo
                    todo={selectedTodo!}
                />
            </BottomSheetModal>
            <FlashMessage position="bottom" />
        </LinearGradient>
    );
};
export default TodoDashboard;
