import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
    },
    profileContainer: {
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatarCircle: {
        width: 100,
        height: 100,
        backgroundColor: '#FFCF0F', 
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: -10,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
    },
    name: {
        fontSize: 20,
        marginTop: 3,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    rating: {
        marginTop: 2,
        marginLeft:140,
    },
    horizontalLine: {
        width: "80%",
        height: 1,
        backgroundColor: '#B20530',
        marginTop: 25,
        marginLeft: 38
  },
  ageContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 5,
    marginLeft: 40,
    marginRight: 30
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginLeft: 10
  },
  age: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    paddingLeft: 17,
    padding: 5,
    marginTop: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
  },
  editButton: {
    marginTop: 5,
    marginLeft: 320
  }
})