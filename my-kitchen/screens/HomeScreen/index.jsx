import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
const HomeScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        Pacifico_400Regular, Inter_400Regular});
    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>
    }
    return (
        <View style={styles.container}>
            <Text>H</Text>
        </View>
    );
};

export default HomeScreen;