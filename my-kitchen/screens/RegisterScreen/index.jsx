import { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import { useFonts, Inter_400Regular,Inter_600SemiBold} from '@expo-google-fonts/inter';
import InputText from "../../components/input/input";
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterScreen() {
  const navigation = useNavigation();  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs , setInputs] = useState({
      full_name: '',
      email: '',
      password: '',
      phone: '',
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
      const response = await fetch(`${EXPO_PUBLIC_API_URL}`+'/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: inputs.full_name,
          email: inputs.email,
          password: inputs.password,
          phone: inputs.phone
        }),
      });
      const data = await response.json();
      if (data) {
        const { token, user } = data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate('Boarding1');
      } else {
        setErrorMessage("An error occurred while logging in. Please try again.");
      }
      } catch (error) {
        setErrorMessage("Error registering. Please try again !");
      }
    }; 
    return (
            <View>
                <View style={styles.container}> 
                    <Image source={require('../../assets/plates1.jpg')} style={styles.imageStyle}/>
                    <Image source={require('../../assets/logo.png')} style={styles.logoStyle}/>
                </View>
                <Text style={[styles.signUpText, styles.customText]}>Sign Up</Text>
                <View style={styles.margin2}>
                  <View style={styles.margin}>
                    <InputText placeholder="Full name" placeholderTextColor={'#989997'} secureTextEntry={false} 
                    onChangeText={value => handleChange('full_name', value)}/> 
                  </View>
                  <View style={styles.margin}>
                  <InputText placeholder="Email" placeholderTextColor={'#989997'} secureTextEntry={false}
                  onChangeText={value => handleChange('email', value)}></InputText>
                  </View>
                  <View style={styles.margin}>
                  <InputText placeholder="Password" placeholderTextColor={'#989997'} secureTextEntry={!passwordVisible}
                  onChangeText={value => handleChange('password', value)}/>
                  </View>
                  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                    <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                  </TouchableOpacity>
                  {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                  <InputText placeholder="Phone number" placeholderTextColor={'#989997'} secureTextEntry={false} 
                  onChangeText={value => handleChange('phone', value)}/>
                  <TouchableOpacity  onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
            </View>
    );
}

export default RegisterScreen;