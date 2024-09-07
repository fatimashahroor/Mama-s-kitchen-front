import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        aspectRatio: 8/7.5,
        resizeMode: 'cover',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    icon: {
        marginTop: 25,
        marginLeft: 25,
        color: "#B20530",
        position: 'absolute',
        zIndex: 1,
    },
    imageContainer: {
        position: 'relative', 
    },
    star: {
        color: '#B20530',
        position: 'absolute',
        zIndex: 1,
        marginTop: 25,
        marginLeft: 298,
    },
    cart: {
        color: '#B20530',
        position: 'absolute',
        zIndex: 1,
        marginTop: 25,
        marginLeft: 330,
    },
    name: {
        color: 'black',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        marginLeft: 25,
        marginTop: 10,
    },
    cookName: {
        color: 'gray',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 17,
        marginLeft: 25,
        marginTop: 5,
    },
    price: {
        color: 'black',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        marginLeft: 328,
        marginTop: -45,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20.5,
        marginLeft: 27,
        marginTop: 20,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Inter_600SemiBold',
    },
    button: {
        backgroundColor: '#B20530',
        borderRadius: 30,
        width: 96,
        height: 60,
    },
    text1: {
        color: 'white',
        textAlign: 'center',
        marginTop: -6,
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
    },
    text2: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        marginTop: 15,
        marginLeft: 25,
    },
    text3: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        marginTop: 5,
        marginLeft: 25,
        marginRight: 35,
    },
})