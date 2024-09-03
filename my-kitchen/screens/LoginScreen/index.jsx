import { Text, View, Image } from "react-native";
import styles from "./styles";

function LoginScreen() {
    return (
            <View>
                <View style={styles.container}> 
                    <Image source={require('../../assets/plates1.jpg')} style={styles.imageStyle}/>
                    <Image source={require('../../assets/logo.png')} style={styles.logoStyle}/>
                </View>
            </View>
    );
}

export default LoginScreen;