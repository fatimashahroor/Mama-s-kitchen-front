import { useState } from "react";
import { Text, View, Image, TouchableOpacity,  TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import { useFonts, Inter_400Regular, Inter_600SemiBold} from '@expo-google-fonts/inter';
import InputText from "../../components/input/input";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EXPO_PUBLIC_API_URL} from '@env';

function LoginScreen() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();  
    const [errorMessage, setErrorMessage] = useState("");
    const [inputs , setInputs] = useState({
        email: '',
        password: ''
    })
    const togglePasswordVisibility = () => {
      setPasswordVisible(prevState => !prevState);
   };
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Inter_600SemiBold,
      });
      if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
      }
      const handleChange = (id, value) => {
        setInputs(previnputs => ({
            ...previnputs,
            [id]: value
        }));
    };
    const handleSubmit = async () => {
      try {
        const response = await fetch(`${EXPO_PUBLIC_API_URL}`+'/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: inputs.email,
            password: inputs.password,
          }),
        });
        const data = await response.json();
        if (data) {
          const { access_token, user } = data;
          await AsyncStorage.setItem('token', access_token);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          navigation.navigate('Boarding1');
        } else {
          setErrorMessage("An error occurred while logging in. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Wrong email or password. Please try again !");
      }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Image source={require('../../assets/plates1.jpg')} style={styles.imageStyle}/>
                <Image source={require('../../assets/logo.png')} style={styles.logoStyle}/>
                <Text style={[styles.loginText, styles.customText]}>Login</Text>
            </View>
            <View style={styles.margin2}>
                <InputText id= 'email' placeholder="Email" placeholderTextColor={'#989997'} secureTextEntry={false} 
                onChangeText={(value) => handleChange('email', value)}/>
                <InputText id= 'password' placeholder="Password" placeholderTextColor={'#989997'} secureTextEntry={!passwordVisible}
                onChangeText={(value) => handleChange('password', value)}/>
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                  <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                </TouchableOpacity>
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <TouchableOpacity onPress={() => navigation.navigate('forgotpassword')}>
                    <Text style={[styles.customText1, styles.margin1, styles.forgotPass]}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.flexRow}>
                    <Text style={[styles.customText1, styles.margin2, styles.accountText]}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.customText1, styles.signUp, styles.margin2]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.flexColumn}>
                    <Text style={[styles.customText1, styles.accountText, styles.margin]}>You're a cook and wants to {'\n'}start your journey with us? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
                        <Text style={[styles.customText1, styles.signUp]}>Contact Us</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;