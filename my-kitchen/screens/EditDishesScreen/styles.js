import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    menu: {
        marginTop: -23,
        marginLeft: 325,
        color: '#B20530',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 56, 
        right: 37,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 100, 
    },
    dropdownItem: {
        padding: 10,
        fontSize: 16,
        width: 110,
        fontFamily: 'Inter_400Regular',
        marginLeft : 10,
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
        marginLeft: 27,
        marginTop: 25,
        width: 150,
        height: 180,
    },
    dishName: {
        marginTop: 7,
        marginLeft: 17,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
    },  
    dishPrice: {
        marginTop: 10,
        marginLeft: 17,
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    space: {
        alignContent: 'center',
    },
    dishesContainer: {
        flexDirection: 'row',  
        flexWrap: 'wrap',     
        justifyContent: 'center',
    },
    scrollView: {
        height: '100%',
        marginTop: 20,
        marginRight: 2,
        zIndex: -10
    },
    none: {
        color: "#B20530",
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        marginTop: 60,
        marginLeft: 130
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 180
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
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationInput: {
        width: 40,
        textAlign: 'center',
        marginHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },    
    text1: {
        color: 'gray',
    }
})
