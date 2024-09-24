import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    back: {
        marginLeft: 30,
        marginTop: 40,
        marginBottom: -40,
    },
    text: {
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
        fontSize: 18,
        marginLeft: 30,
        marginTop: 30,
        marginBottom: 25,
        fontFamily: 'Inter_400Regular',
    },
    add: {
        marginLeft: 330,
        marginBottom: 10,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 200
    },
    modalView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 50,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "flex-start",
        width: 240,
        borderWidth: 1,
        borderColor: '#B20530',
        paddingLeft: 10,
        paddingBottom: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        margin: 10,
        width: 100,
    },
    buttonClose: {
        borderWidth: 1,
        borderColor: '#B20530',    
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    date: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 30,
        fontFamily: 'Inter_400Regular',
        color: 'gray',
    },
    icon: {
        marginBottom: 10,
        marginLeft: 330,
        marginTop: -30,
        color: 'gold',
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'left',
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
    },
    selectedLocation: {
        backgroundColor: 'lightyellow',  
        borderColor: '#FFD21C',  
    },
    unselectedLocation: {
        backgroundColor: '#fff',
        borderColor: '#ddd',  
    },
    locationText: {
        flex: 1,
        fontSize: 16,
        color: '#333',  
    },
    addLocationButton: {
        marginTop: 20,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: '#B20530',  
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    addLocationText: {
        color: '#fff',  
        fontSize: 16,
    },
    payment : {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#B20530',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -10,
    },
    checked: {
        backgroundColor: '#B20530',
    },
    checkmark: {
        color: '#fff',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    paymentContainer: {
        margin: 30,
    },
    paymentText: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
    }
})

