import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
    },
    profileContainer: {
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatarCircle: {
        width: 100,
        height: 100,
        backgroundColor: '#FFCF0F', 
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: -10,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
    },
    name: {
        fontSize: 20,
        marginTop: 3,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    rating: {
        marginTop: 2,
        marginLeft:140,
    },
    horizontalLine: {
        width: "80%",
        height: 1,
        backgroundColor: '#B20530',
        marginTop: 9,
        marginLeft: 38,
        marginBottom: 20,
    },
    ageContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 5,
        marginLeft: 30,
        marginRight: 34,
        paddingTop: 10,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        marginLeft: 10,
        marginBottom: 5,
    },
    age: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 30,
        paddingLeft: 17,
        padding: 5,
        marginTop: 1,
        fontSize: 17,
        fontFamily: 'Inter_400Regular',
        width: 320
    },
    flex: {
        display: 'flex',
        flexDirection: 'column',
    },
    editButton: {
        marginLeft: 325,
        marginTop: -42,
    },
    available : {
        color: 'green',
    },
    busy : {
        color: 'red',
    },
    offline : {
        color: 'gray',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 30,
        height: 45,
        marginTop: 1,
        width: 320,
        overflow: 'scroll', 
    },
    picker: {
        backgroundColor: 'transparent', 
        width: '100%',
        marginLeft: 3,
        fontFamily: 'Inter_400Regular',
        top: -5
    },
})