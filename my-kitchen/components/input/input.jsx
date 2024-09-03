import {Text, View, TextInput} from 'react-native';
import styles from './InputStyle';
 
const InputText = ({ label, placeholder, onChangeText, secureTextEntry, placeholderTextColor }) => {
  return (
      <View style={styles.container}>
         <Text style={styles.label}>{label}</Text>
          <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
          />
      </View>
  );
};

export default InputText;