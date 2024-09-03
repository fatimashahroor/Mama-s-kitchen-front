import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 0,
        alignItems: 'center',
        },
    imageStyle: {
        width: "100%",
        height: "54%",
        resizeMode: 'cover'
    },
    logoStyle: {
        width: "23%",
        height: "37%",
        borderRadius: 350,
        resizeMode: 'cover',
        position: 'absolute',
        top: 80,
    },
    loginText: {
        fontSize: 40,
        color: '#B20530',
        textAlign: 'center',
        marginTop: -30,
    },
    customText: {
        fontFamily: 'Inter_600SemiBold',
   }
})