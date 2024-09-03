import { Text, View, Image } from "react-native";
import styles from "./styles";
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_600SemiBold} from '@expo-google-fonts/inter';
function LoginScreen() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Inter_700Bold, Inter_600SemiBold,
      });
    
      if (!fontsLoaded) {
        return <View style={styles.container}><Text>Loading Fonts...</Text></View>;
      }

    return (
            <View>
                <View style={styles.container}> 
                    <Image source={require('../../assets/plates1.jpg')} style={styles.imageStyle}/>
                    <Image source={require('../../assets/logo.png')} style={styles.logoStyle}/>
                </View>
                <Text style={[styles.loginText, styles.customText]}>Login</Text>
            </View>
    );
}

export default LoginScreen;