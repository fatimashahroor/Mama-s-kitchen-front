import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Alert } from "react-native";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { EXPO_PUBLIC_API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";

const ChefProfileScreen = () => {
    const [details, setDetails] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const [inputHeight, setInputHeight] = useState(35);
    const [isEditable, setIsEditable] = useState(false); 
    const [error, setError] = useState('');
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Inter_600SemiBold});
    const handleContentSizeChange = (event) => {
        setInputHeight(event.nativeEvent.contentSize.height);
    };
    const toggleEdit = async () => {
        if (isEditable) {
            if (!validateInputs()) {
                return;
            }
            await updateDetails(); 
            setIsEditable(false); 
        } else {
            setIsEditable(true); 
        } 
    };
    const validateInputs = () => {
        let isValid = true;
        let errors = [];
        if (!details.age || details.age.toString().trim() === '') {
            errors.push('Age is empty');
            isValid = false;
        }
        if (!details.phone || details.phone.trim() === '') {
            errors.push('Phone number is empty');
            isValid = false;
        }
        if (!details.bio || details.bio.trim() === '') {
            errors.push('Bio is empty');
            isValid = false;
        }
        if (!details.located_in || details.located_in.trim() === '') {
            errors.push('Location is empty');
            isValid = false;
        }
        if (!details.status || details.status.trim() === '') {
            errors.push('Status is empty');
            isValid = false;
        }
        if (!isValid) {
            Alert.alert('Error', errors.join('\n'));
        }
        setError(errors.join(', '));
        return isValid;
    };
    
    const StarRating = ({ rating }) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(
                <FontAwesome5 key={i} name="star" solid size={14} style={{ color: 'gold', marginRight: 4}} />
            );
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {stars}
                {rating < 5 && Array.from({ length: 5 - rating }, (_, i) => (
                    <FontAwesome5 key={i + rating} name="star" size={14} style={{ color: 'lightgray', marginRight: 4 }} />
                ))}
            </View>
        );
    };
    const getCookDetails = async () => {
        const chef = await AsyncStorage.getItem('user');
        const chefId = JSON.parse(chef);
        const token= await AsyncStorage.getItem('token');
        if (!chefId?.id || !token) {
            throw new Error('Invalid chef data or missing token');
        }
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/user/${chefId.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (data) {
                setDetails(data.user);
                const image = (data.user.image_path && data.user.image_path !== "" ? data.user.image_path : null);
                const image_uri = `${EXPO_PUBLIC_API_URL}/images/${image}`;
                setProfileImage(image_uri);
            } else {
                throw new Error('Failed to fetch cook details');
            } 
        } catch (error) {
            console.error(error);
        }
    };


    const updateDetails = async () => {
        const user = await AsyncStorage.getItem('user');
        const userId = JSON.parse(user).id;
        const formData = new FormData();
        formData.append('phone', details.phone);
        formData.append('age', details.age); 
        formData.append('bio', details.bio);
        formData.append('located_in', details.located_in);
        formData.append('status', details.status);
        if (profileImage) {
            const uriParts = profileImage.split('.');
            const fileType = uriParts[uriParts.length - 1];
            formData.append('photo', {
                uri: profileImage,
                name: `photo.${fileType}`, 
                type: `image/${fileType}`
            });
        }
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/user/update/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: formData
            });
            const data = await response.json();
            if (data) {
                setDetails(data.user);
                const image = (data.user.image_path && data.user.image_path !== "" ? data.user.image_path : null);
                const image_uri = `${EXPO_PUBLIC_API_URL}/images/${image}`;
                setProfileImage(image_uri);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission required", "We need permission to access your photos to update your profile picture!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 1, aspect: [4, 3],      
        });
        console.log(result);
        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };
    
    useEffect(() => {
        getCookDetails();
    }, []);
    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }
     
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Profile</Text>
            <TouchableOpacity onPress={toggleEdit} style={styles.editButton}>
                <Ionicons name={isEditable ? "checkmark" : "create"} size={24} color="#B20530"/>
            </TouchableOpacity>
            <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                    {profileImage ? (
                            <Image
                                source={{ uri: profileImage}} style={styles.avatarCircle}/>
                        ) : (
                            <Ionicons name="person-outline" size={50} color="gray" />
                        )}
                    </View>
                    <TouchableOpacity style={styles.cameraIcon}>
                        <Ionicons name="camera" size={24} color={isEditable ? "#B20530" : "gray"} onPress={isEditable? pickImage : null}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.name}>{details.full_name}</Text>
            <View style={styles.rating}>
                <StarRating rating={Math.round(details.overall_rating)}/>
            </View>
            <View style={styles.horizontalLine} />
            <ScrollView style={styles.flex}>
                <View style={styles.ageContainer}>
                    <Text style={styles.label}>Age</Text>
                    <TouchableWithoutFeedback>
                        <TextInput style={[styles.age]} editable={isEditable} placeholder="eg: 25"
                            value={details.age ? details.age.toString() : ''} 
                            onChangeText={(text) => setDetails({ ...details, age: text })}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.ageContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TouchableWithoutFeedback>
                        <TextInput style={[styles.age]} value={details.email} editable={false}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.ageContainer}>
                    <Text style={styles.label}>Phone</Text>
                    <TouchableWithoutFeedback>
                        <TextInput style={[styles.age]} editable={isEditable} placeholder="eg: +961 76543210"
                            value={details.phone || ''} onChangeText={(text) => setDetails({ ...details, phone: text })}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.ageContainer}>
                    <Text style={styles.label}>Status</Text>
                    <View style={styles.pickerContainer}>
                        <Picker style={styles.picker} selectedValue={details.status} 
                            onValueChange={(itemValue, itemIndex) => setDetails({ ...details, status: itemValue })}
                            enabled={isEditable} mode="dropdown" >
                            <Picker.Item label="Available" value="Available" style={styles.available}/>
                            <Picker.Item label="Busy" value="Busy" style={styles.busy}/>
                            <Picker.Item label="Offline" value="Offline" style={styles.offline}/>
                        </Picker>
                    </View>
                </View>
                <View style={styles.ageContainer}>
                    <Text style={styles.label}>Location</Text>
                    <TouchableWithoutFeedback>
                        <TextInput style={styles.age} editable={isEditable} value={details.located_in || ''} 
                            onChangeText={(text)=>setDetails({...details, located_in: text })} 
                            onContentSizeChange={handleContentSizeChange}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.ageContainer}>
                    <Text style={styles.label}>Bio</Text>
                    <TouchableWithoutFeedback>
                        <TextInput multiline={true} style={[styles.age, { height: inputHeight, textAlignVertical: 'top' }]} editable={isEditable} 
                            value={details.bio || ''} onChangeText={(text) => setDetails({ ...details, bio: text })}
                            onContentSizeChange={handleContentSizeChange}/>
                    </TouchableWithoutFeedback>
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </ScrollView>
        </View>
    );
};

export default ChefProfileScreen;