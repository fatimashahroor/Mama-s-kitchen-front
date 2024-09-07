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
})