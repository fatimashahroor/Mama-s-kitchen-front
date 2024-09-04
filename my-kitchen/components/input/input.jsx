import {Text, View, TextInput} from 'react-native';
import styles from './InputStyle';
 
const InputText = ({ label, placeholder, onChangeText, secureTextEntry, placeholderTextColor, onBlur, onFocus, value }) => {
  return (
      <View style={styles.container}>
         <Text style={styles.label}>{label}</Text>
          <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              onBlur={onBlur}
              onFocus={onFocus}
              value={value}
          />
      </View>
  );
};

export default InputText;