import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        margin: 30,
        flex: 1,
        backgroundColor: 'white',
    },
    imageStyle: {
        width: 67,
        height: 67,
        borderRadius: 35,
        marginTop: 40,
        marginLeft: 0,
        marginRight: 8
    },
    icon: {
        marginLeft: 5,
        marginTop: 2,
    },
    star: {
        marginLeft: 298,
        marginTop: -19,
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
        marginLeft: 38,
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
    dayTitle: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        marginTop: 12,
        marginLeft: 2,
        color: '#B20530'
    },
    scrollView: {
        height: 45,
        marginTop: 10,
        marginRight: 2,
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
    dayButton: {
        borderRadius: 30,
        backgroundColor: "#B20530",
        marginRight: 5,
    },
    none: {
        color: "#B20530",
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        marginTop: 60,
        marginLeft: 90
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        height: 200,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Inter_600SemiBold',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#B20530', 
        padding: 10,
        borderRadius: 5,
        flex: 1, 
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});