/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

interface TodoData {
    id: number;
    Category: string;
    Completed: boolean;
    Description: string;
    Title: string;
}

interface Props {
    todo: TodoData;
}

const TodoItemInfo = ({ todo }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo Details</Text>
            {todo && (
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Title: {todo.Title}</Text>
                    <Text style={styles.description}>
                        Description: <Text style={{color:'#555'}}>{todo.Description}</Text></Text>
                    <Text style={styles.category}>
                        Category: <Text style={{color: '#007BFF'}}>{todo.Category}</Text>
                    </Text>
                    <Text style={[styles.completed]}>
                        Completed : <Text style={{color: todo.Completed ? 'green' : 'red'}}>{todo.Completed ? 'Yes' : 'No'}</Text>
                    </Text>
                </View>
            )}
        </View>
    );
};

export default TodoItemInfo;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    infoContainer: {
        padding: 10,
    },
    title: {
        fontSize:16,
        fontWeight: '600',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
    category: {
        fontSize: 16,
        marginBottom: 5,

    },
    completed: {
        fontSize: 16,
        fontWeight: '500',
    },
});
