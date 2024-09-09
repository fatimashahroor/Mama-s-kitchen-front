import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: 10,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    }
})