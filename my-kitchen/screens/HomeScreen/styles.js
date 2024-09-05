import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo: {
        width: 50,
        height: 52,
        borderRadius: 300,
        marginLeft: 25,
        marginTop: 35,
    },
    appName : {
        color: '#B20530',
        fontFamily: 'Pacifico_400Regular',
        fontSize: 20,
        marginLeft: 12,
        marginTop: 40,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    flexStart: {
        justifyContent: 'flex-start',
    },
    icon: {
        marginTop: -22,
        marginLeft: 328,
        border: '#B20530',
    },
    justify: {
        justifyContent: 'center',
    },
    image: {
        width: 120,
        height: 100,
        marginLeft: 15,
        marginRight: 30,
        marginTop: 15,
        borderRadius: 15,
    },
    dish: {
        backgroundColor: "#FFD21C",
        borderRadius: 30,
        marginLeft: 15,
        marginTop: 25,
        marginRight: 10,
        width: 150,
        height: 200,
    },
    dishName: {
        marginTop: 10,
        marginLeft: 15,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
    },  
    dishPrice: {
        marginTop: 10,
        marginRight: 15,
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    space: {
        justifyContent: 'space-between',
    },
    cart: {
        alignSelf: 'flex-end',
        marginTop: 3,
        marginRight: 15,  
    },
    user: {
        marginTop: 5,
        marginLeft: 15,  
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    scrollView: {
        backgroundColor: "#B20530",
        height: 50,
        marginTop: 10,
        marginLeft: 30,
        borderRadius: 30,
        marginRight: 30,
    },
    dayText: {
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },
    none: {
        color: "#B20530",
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        marginTop: 60,
    },
})