import { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import SearchInput from '../../components/search/search';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const ChefsScreen = () => {
    const [chefs, setChefs] = useState([]);
    const navigation = useNavigation();
    const [rating, setRating] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [fontsLoaded] = useFonts({
      Inter_400Regular, Inter_600SemiBold});
    const StarRating = ({ rating }) => {
      const stars = [];
      for (let i = 0; i < rating; i++) {
          stars.push(
              <FontAwesome5 key={i} name="star" solid style={{ color: 'gold', marginRight: 4 }} />
          );
      }
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {stars}
            {rating < 5 && Array.from({ length: 5 - rating }, (_, i) => (
                <FontAwesome5 key={i + rating} name="star" style={{ color: 'lightgray', marginRight: 4 }} />
            ))}
        </View>
      );
    };
    const getStatusColor = (status) => {
      switch (status) {
          case 'Available':
              return 'green';
          case 'Busy':
              return 'red';
          case 'Offline':
              return 'gray';
      }
  };
    const getChefs = async () => {
      const user = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/cooks`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data) {  
          setChefs(data.cooks);
          data.cooks.forEach(cook => getOverallRating(cook.id));
        } else {
          throw new Error(data.message || "Error fetching data");
         }
      } catch (error) {
        console.error(error);
      }
    }
    const getOverallRating = async (cookId) => {
      try {
        const response = await fetch (`${EXPO_PUBLIC_API_URL}/api/user/rating/${cookId}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data) {
          setRating(prevRating => ({
            ...prevRating,
            [cookId]: data.overall_rating
          }));
        } else {
          throw new Error(data.message || "Error fetching rating");
        }
    } catch (error) {
      console.error(error);
    }
  }
    useEffect(() => {
      getChefs();
    }, []);

    const filteredChefs = chefs.filter((chef) => 
      chef.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (!fontsLoaded) {
      return <Text>Loading Fonts...</Text>;
    }
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.title}>Our Chefs</Text>
          <ScrollView>
          <SearchInput placeholder={"Find your favorite chef"} value={searchQuery} onChangeText={setSearchQuery}/>
          <View style={styles.marginTop}>
            {filteredChefs.map((data) => (
              <View key={data.id} style={styles.chef}>
                <Image source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${data.image_path}` }}
                  style={styles.chefImage}
                />
                <View style={styles.flexColumn}>
                <Text style={styles.chefName}>{data.full_name}</Text>
                <StarRating rating={rating[data.id] || 0} />
                <Text style={{ color: getStatusColor(data.status), fontFamily: 'Inter_400Regular', fontSize: 12 }}>
                                    {data.status}
                </Text>
                </View>
                <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChefMenu', {chef: data})}>
                   <Text style={styles.menu}>View Menu</Text>
                </TouchableOpacity>
                </View>
              </View> 
            ))}      
          </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>  
    );
}

export default ChefsScreen;