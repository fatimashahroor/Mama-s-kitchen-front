import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
    },
    button: {
        backgroundColor: "#B20530",
        height: 40,
        width: 100,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center', 
        marginLeft: 10, 
    },
    menu: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: "white",
    },
    chefImage: {
        width: 50,
        height: 50,
        borderRadius: 25,  
        marginRight: 20,
        marginLeft: 15, 
        marginTop: 25,
    },
    chefName: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
    chef: {
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 13,  
        width: 323,
        flexWrap: 'wrap',
        borderRadius: 30,
        borderColor: "#B20530",
        borderWidth: 1,
        height: 110,
        marginLeft: 30,
        marginTop: 30, 
        marginBottom: 10
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 5,
    },
    marginTop: {
        marginTop: 10
    }
})