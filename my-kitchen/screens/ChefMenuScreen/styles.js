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
        marginLeft: -2,
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
        width: 1.5,
        height: '55%',
        backgroundColor: '#FFD21C',
        marginHorizontal: 8,
        marginTop: 40,
        marginRight: 20
    },
      horizontalLine: {
          width: "70%",
          height: 1.5,
          backgroundColor: '#FFD21C',
          marginTop: 20,
          marginLeft: 48
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
        marginLeft: 73,
        color: 'gray',
        marginTop: 5
    },
      chefBio: {
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
        color: 'black',
        marginTop: 20,
        marginLeft: 2,
    },
      menuTitle: {
        fontSize: 22,
        fontFamily: 'Inter_600SemiBold',
        marginTop: 10,
        marginLeft: 2
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
        marginLeft: 2,
        marginTop: 25,
        width: 150,
        height: 180,
    },
    dishName: {
        marginTop: 7,
        marginLeft: 35,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
    },  
    dishPrice: {
        marginTop: 5,
        marginRight: 15,
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
    space: {
        alignContent: 'center',
    },
    cart: {
        alignSelf: 'flex-end',
        marginTop: -26,
        marginRight: 15,  
    },
    dishesContainer: {
        flexDirection: 'row',  
        flexWrap: 'wrap',     
        justifyContent: 'flex-start',
        gap: 16
    },
})