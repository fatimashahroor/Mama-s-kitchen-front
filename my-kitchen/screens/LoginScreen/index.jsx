import { Text, View, Image } from "react-native";
import styles from "./styles";

function LoginScreen() {
    return (
            <View>
                <Image source={require('../../assets/plates1.jpg')} style={styles.imageStyle}/>
            </View>
    );
}

export default LoginScreen;