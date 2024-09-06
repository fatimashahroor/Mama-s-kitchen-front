import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        margin: 30,
        flex: 1,
    },
    imageStyle: {
        width: 67,
        height: 67,
        borderRadius: 35,
        marginTop: 40,
        marginLeft: 5,
    },
    icon: {
        marginLeft: 5,
        marginTop: 5
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chefName: {
        marginLeft: 20,
        marginTop: 50,
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    }
})