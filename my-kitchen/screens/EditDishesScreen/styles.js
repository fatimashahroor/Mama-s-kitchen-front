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
        justifyContent : 'space-evenly',
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
        zIndex: 1, 
    },
    dropdownItem: {
        padding: 10,
        fontSize: 16,
        width: 110,
        fontFamily: 'Inter_400Regular',
        marginLeft : 10,
    },
})
