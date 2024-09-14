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
    cards: {
        borderWidth: 1,
        borderColor: '#B20530',
        marginTop: 30,
        marginLeft: 27,
        marginRight: 27,
        borderRadius: 30,
        padding: 10,
        height: 225,
        marginBottom: 20
    },
    orderImage: {
        width: 90,
        height: 90,
        marginTop: 5,
        marginLeft: 5,
        borderRadius: 30,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center"
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    orderName: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        marginTop: 5,
    },
    orderedBy: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Inter_400Regular',
    },
    quantity: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 3,
        fontFamily: 'Inter_400Regular',
    },
    header: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        marginTop: 15,
        marginBottom: 5,
    },
    comment: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginBottom: 3,
    },
    date: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        marginTop: 13,
    },
    ingredients: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginBottom: 3,
    },
    filterButton: {
        width: 100,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
        marginLeft: 10,
    },
    filterText: {
        color: "#B20530",
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    verticalLine: {
        width: 1.5,
        height: '55%',
        backgroundColor: '#B20530',
        marginHorizontal: 8,
        marginTop: 40,
        marginRight: -5,
        marginLeft: -5,
    },
    activeFilter : {
        backgroundColor: '#dedede', 
        fontWeight: 'bold',
        color: 'black'
    },
    enabledButton : {
        backgroundColor: 'transparent', 
    },    
    disabledButton : {
        backgroundColor: 'transparent',
        opacity: 0.1, 
    }
})