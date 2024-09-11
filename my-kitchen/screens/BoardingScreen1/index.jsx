import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import {Inter_400Regular, Inter_600SemiBold} from '@expo-google-fonts/inter';
import { useFonts, Pacifico_400Regular} from '@expo-google-fonts/pacifico';

const BoardingScreen1 = () => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        Pacifico_400Regular, Inter_400Regular});
      if (!fontsLoaded) {
        return <View style={styles.container}><Text>Loading Fonts...</Text></View>;
      }
    return (
        <View style={styles.container}>
          <View style={styles.flexColumn}>
            <Text style={styles.appName}>Mama's</Text>
            <Text style={styles.appName}>  Kitchen</Text>
          </View>
          <Image source={require('../../assets/onBoarding2.jpg')} style={styles.imageStyle}></Image>
          <Text style={styles.customText}>Dive into the pleasure of home-made {'\n'} food with your favorite flavors!</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CustomerTabs')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
    );
}

export default BoardingScreen1;