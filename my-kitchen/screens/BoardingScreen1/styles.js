import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 60,
    },
    appName: {
        fontSize: 45,
        fontFamily: 'Pacifico_400Regular',
        color: '#B20530',
        textAlign: 'center',
        marginTop: -26,
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    imageStyle: {
        marginTop: 30,
    },
    customText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        marginTop: 30,
        color: 'black',
    },
    button: {
        backgroundColor: '#B20530',
        borderRadius: 30,
        marginTop: 40,
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Inter_400Regular',
    }
})