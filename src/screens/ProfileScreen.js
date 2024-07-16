import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ route }) {
  const { userId } = route.params;
  console.log("ProfileScreen - userId:", userId);  // Debugging log

  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId) => {
    console.log("Fetching data for userId:", userId);  // Debugging log
    try {
      const response = await fetch(`http://192.168.1.6:8000/user/${userId}`);
      if (!response.ok) {
        const data = await response.json(); // Log detailed error response
        console.error(data);
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setFirstName(data.name);
      setLastName(data.surname);
      setEmail(data.email);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleChangePassword = () => {
    // Implement change password logic here
    alert('Change Password clicked');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={profileImage ? { uri: profileImage } : require('../../assets/default-profile.jpg')} style={styles.profileImage} />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.info}>{firstName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.info}>{lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#0066cc',
    fontSize: 16,
    marginBottom: 20,
  },
  infoContainer: {
    width: '80%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  info: {
    fontSize: 18,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
