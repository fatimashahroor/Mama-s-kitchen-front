import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
    },
    menu: {
        marginTop: -23,
        marginLeft: 329,
        color: '#B20530',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    scrollView: {
        flex: 2,
        height: "100%",
        marginTop: 20,
        marginRight: 2,
    },
    space: {
        justifyContent: 'center',
    },
    none: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        color: '#B20530',
    },
    IngContainer: {
        display: 'flex',
        padding: 10,
        marginLeft: 18,
        marginRight: 20,
    },
    ing: {
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#FFD21C', 
    },
    name: {
        fontSize: 16,
        flex: 1,
        fontFamily: 'Inter_600SemiBold',
        color: 'black',
    },
    cost: {
        fontSize: 16,
        flex: 1,
        fontFamily: 'Inter_400Regular',
    },
    editButton: {
        marginRight: 50,
    },
    trash: {
        flex: 1,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 270
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
        margin: 5,
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
})