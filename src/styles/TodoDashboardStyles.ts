import {Dimensions, StyleSheet} from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
console.log(ScreenHeight, ScreenWidth);
export const TodoDashboardStyles = () =>
  StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        marginHorizontal: 8,
    },
    section: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
    },
    heading: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    createButton: {
        position: 'absolute',
        right: 0,
        bottom: 30,
        width: 60,
        height: 60,
        // paddingVertical: 10,
        backgroundColor: '#becce2',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskContainer: {
        width: '100%',
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    task: {
        flex: 1,
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskIcon: {
        flex: 1,
        height: '100%',
        flexGrow: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    taskDetails: {
        flex: 5,
        gap: 4,
    },
    taskTitle: {
        fontSize: 17,
    },
    taskDescription: {
        fontSize: 15,
    },
  });
