import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_600SemiBold} from '@expo-google-fonts/inter';
import InputText from "../../components/input/input";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function RegisterScreen() {
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
                <Text style={[styles.signUpText, styles.customText]}>Sign Up</Text>
                <View style={styles.margin2}>
                  <InputText placeholder="Full name" placeholderTextColor={'#989997'} secureTextEntry={false}/>
                  <InputText placeholder="Email" placeholderTextColor={'#989997'} secureTextEntry={false}></InputText>
                  <InputText placeholder="Password" placeholderTextColor={'#989997'} secureTextEntry={true}/>
                  <TouchableOpacity  onPress={() => navigation.navigate('Login')} style={styles.button}>
                    <Text style={styles.buttonText}>Sign up</Text>
                  </TouchableOpacity>
                  <View style={styles.flexRow}>
                      <Text style={[styles.customText1, styles.signUp, styles.margin1]}>___________________ </Text>
                      <Text style={[styles.customText1, styles.signUp, styles.margin1]}>or</Text>
                      <Text style={[styles.customText1, styles.signUp, styles.margin1]}> ___________________</Text>
                  </View>
                  <View style={styles.flexColumn}>
                    <Text style={[styles.customText, styles.signUpWithText, styles.margin2]}>Sign up with</Text>
                  </View>
                  <View style={[styles.flexRow, styles.margin1]}>
                    <View style={styles.margin}>
                        <FontAwesome5 name="google" size={24} color="#B20530"/></View>
                        <FontAwesome5 name= "apple" size={30} color="#B20530"/>
                  </View>
                </View>
            </View>
    );
}

export default RegisterScreen;