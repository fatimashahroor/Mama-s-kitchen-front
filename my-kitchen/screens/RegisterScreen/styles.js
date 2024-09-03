import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 0,
        alignItems: 'center',
        },
    imageStyle: {
        width: "100%",
        height: 140,
        resizeMode: 'cover'
    },
    logoStyle: {
        width: 90,
        height: 95,
        borderRadius: 350,
        resizeMode: 'cover',
        position: 'absolute',
        top: 90,
    },
    signUpText: {
        fontSize: 40,
        color: '#B20530',
        textAlign: 'center',
        marginTop: 80,
    },
    customText: {
        fontFamily: 'Inter_600SemiBold',
    },
    customText1: {
    fontFamily: 'Inter_400Regular',
    },
    textInput: {
        height: 55,
        borderColor: 'grey',
        borderWidth: 1,
        width: 280,
        marginLeft: 50,
        borderRadius: 30,
        paddingLeft: 30,
        fontSize: 18,
    },
    margin: {
        marginTop: 6,
        marginRight: 16
    },
    margin1: {
        marginTop: 10,
    },
    button: {
        backgroundColor: '#B20530',
        width: 280,
        height: 55,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginLeft: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 19,
        fontFamily: 'Inter_400Regular',
    },
    margin2: {
        marginTop: 20,
    },
    signUpWithText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUp: {
        color: '#B20530',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
})