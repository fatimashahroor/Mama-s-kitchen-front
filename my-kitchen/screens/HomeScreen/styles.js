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
    flexedByRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    flexStart: {
        justifyContent: 'flex-start',
    },
    icon: {
        marginTop: -25,
        marginLeft: 323,
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
        marginLeft: 28,
        marginTop: 25,
        marginRight: 0,
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
        height: 45,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    dayText: {
        marginTop: 12,
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
        marginTop: 100,
        marginLeft: 126,
    },
    day: {
        borderRadius: 30,
        backgroundColor: "#B20530",
        marginRight: 5,
    },
    modalOverlay: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50,
        width: 300,  
    },
    modalText: {
        backgroundColor: '#FFCF0F',
        borderRadius: 15,
        marginBottom: 15,
        fontFamily: 'Inter_400Regular',
        textAlign: "left",
        width: 240,
        padding: 10,
        fontSize: 16,
    },
    closeText: {
        color: 'black',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        marginTop: 40,
    },
    robot: {
        marginBottom: 5,
        marginTop: -18,
    },
    suggestions: {
        fontSize: 16,                       
        color: '#666',                      
        textAlign: 'left',    
        fontFamily: 'Inter_400Regular',             
    },
})