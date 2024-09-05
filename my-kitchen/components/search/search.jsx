import {View, TextInput} from 'react-native';
import styles from './searchStyle';
import { Ionicons } from '@expo/vector-icons';
 
const SearchInput = ({placeholder, onChangeText, placeholderTextColor, onBlur, onFocus, value}) => {
  return (
      <View style={styles.container}>
          <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              onBlur={onBlur}
              onFocus={onFocus}
              value={value}/>
        <Ionicons name='search' size={18} color="#989997" style={styles.icon}></Ionicons>
      </View>
  );
};

export default SearchInput;