import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_600SemiBold} from '@expo-google-fonts/inter';
import InputText from "../../components/input/input";

function LoginScreen() {
    const navigation = useNavigation();  
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
                <View style={styles.margin2}>
                  <InputText placeholder="Email" placeholderTextColor={'#989997'}
                            secureTextEntry={false}/>
                  <InputText placeholder="Password" placeholderTextColor={'#989997'}
                            secureTextEntry={true}/>
                  <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={[styles.customText1, styles.margin1, styles.forgotPass]}>Forgot Password?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                  <View style={styles.flexRow}>
                    <Text style={[styles.customText1, styles.margin2, styles.accountText]}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                      <Text style={[styles.customText1, styles.signUp, styles.margin2]}>Sign Up</Text></TouchableOpacity>
                  </View>
                  <View style={styles.flexColumn}>
                    <Text style={[styles.customText1, styles.accountText, styles.margin]}>You're a cook and wants to {'\n'}start your
                       journey with us? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
                      <Text style={[styles.customText1, styles.signUp]}>Contact Us</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
    );
}

export default LoginScreen;