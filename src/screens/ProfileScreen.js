import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ route }) {
  const { userId } = route.params;
  console.log("ProfileScreen - userId:", userId);

  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId) => {
    console.log("Fetching data for userId:", userId);
    try {
      const response = await fetch(`http://192.168.0.44:8000/user/${userId}`);
      console.log("Response status:", response.status);
      if (!response.ok) {
        const data = await response.json();
        console.error("Error response data:", data);
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      console.log("Fetched user data:", data);
      setFirstName(data.name);
      setLastName(data.surname);
      setEmail(data.email);

      if (data.profile_photo) {
        // Assuming the server returns the path as "./uploads/filename.jpg"
        const profileImageUri = `http://192.168.0.44:8000/uploads/${data.profile_photo.split('/').pop()}?${new Date().getTime()}`;
        console.log("Profile photo URI:", profileImageUri);
        setProfileImage({ uri: profileImageUri });
      } else {
        console.log("No profile photo found, using default image.");
        setProfileImage(require('../../assets/default-profile.jpg'));
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  const pickImage = async () => {
    console.log("Opening image picker");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("Image picker result:", result);
    if (!result.cancelled) {
      console.log("Image picked:", result.uri);
      setProfileImage({ uri: result.uri });
      uploadImage(result.uri);
    } else {
      console.log("Image picker cancelled, no changes made.");
    }
  };

  const uploadImage = async (uri) => {
    console.log("Uploading image:", uri);
    let formData = new FormData();
    formData.append('file', {
      uri,
      name: `profile_${userId}.jpg`,
      type: 'image/jpeg'
    });

    console.log("FormData:", formData);

    try {
      const response = await fetch(`http://192.168.0.44:8000/upload-photo/${userId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      console.log("Upload response status:", response.status);
      console.log("Upload response data:", data);
      if (!response.ok) {
        console.error("Upload failed:", data);
        throw new Error(data.detail || 'Error uploading photo');
      }
      Alert.alert('Success', 'Profile photo updated successfully');
      fetchUserData(userId);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Alert.alert('Error', error.message);
    }
  };

  const handleChangePassword = () => {
    alert('Change Password clicked');
  };

  if (loading) {
    console.log("Loading user data...");
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  console.log("Rendering profile screen with data:", { firstName, lastName, email, profileImage });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={profileImage} style={styles.profileImage} />
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
