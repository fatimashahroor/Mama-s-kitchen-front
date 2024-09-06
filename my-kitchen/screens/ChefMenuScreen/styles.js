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
        marginRight: 8
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
        marginTop: 50,
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    verticalLine: {
        width: 1,
        height: '55%',
        backgroundColor: '#FFD21C',
        marginHorizontal: 8,
        marginTop: 40,
        marginRight: 20
      },
      chefPhone: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
      },
      chefAge: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        marginTop: 52,
        marginBottom: 8
      },
      chefLocation: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        marginLeft: 80,
        color: 'gray',
        marginTop: 5
      },
})