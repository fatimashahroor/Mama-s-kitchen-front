import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }, 
    text : {
        fontSize: 28,
        textAlign: "center",
        marginTop: 50,
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
    },
    text1 : {
        fontSize: 20,
        textAlign: "left",
        paddingLeft: 40,
        marginTop: 20,
        marginBottom: -4,
        fontFamily: 'Inter_400Regular',
    },
    text2: {
        fontSize: 16,
        textAlign: "center",
        marginLeft: -5,
        marginTop: 10,
        marginBottom: 25,
        fontFamily: 'Inter_400Regular',
    },
    dishesContainer: {
        flexDirection: "column",
        padding: 30,
        paddingBottom: 20,
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    dish: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#B20530',
        borderRadius: 30,
        padding: 15,
        height: 'auto',
        overflow: "hidden",
        flexWrap: "wrap",
    },
    dishImage: {
        width: 70,
        height: 70,
        borderRadius: 30,
        marginRight: 10,
    },
    dishPriceContainer: {
        flexDirection: 'column',
        gap: 15,
        justifyContent: 'flex-end',
    },
    dishName: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginRight: 10,
        marginTop: 2
    },
    chef: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        flexWrap: 'wrap',
    },
    dishPrice: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    totalContainer: {
        marginTop: 30,
        marginBottom: -10,
    },
    totalText: {
        textAlign: "center",
        marginRight: -235,
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
    },
    checkoutButton: {
        backgroundColor: '#B20530',
        borderRadius: 30,
        padding: 10,
        marginTop: 20,
        marginLeft: 90,
        marginRight: 30,
        marginBottom: 20,
        width: 200,
    },
    checkoutText: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    emptyCartText: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 90,
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
        color: '#B20530',
    },

})