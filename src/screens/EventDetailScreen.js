// src/screens/EventDetailScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Modal } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const photos = [
  { id: '1', image: require('../../assets/conference.jpeg') },
  { id: '2', image: require('../../assets/happyhour.jpeg') },
  { id: '3', image: require('../../assets/meeting.jpeg') },
  // Add more photos as needed
];

const { width } = Dimensions.get('window');
const itemSize = width / 3 - 2; // Three items per row with some spacing

export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PhotoDetail', { photo: item })}>
      <Image source={item.image} style={styles.photo} />
    </TouchableOpacity>
  );

  const handleCopyToClipboard = () => {
    Clipboard.setString('Copied text from the dummy photo');
    alert('Copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={event.image} style={styles.eventImage} />
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>Event description...</Text>
        <Text style={styles.info}>Participants: 123</Text>
        <Text style={styles.info}>Photos: {photos.length}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <FlatList
          data={photos}
          renderItem={renderPhotoItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.photoList}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Image source={require('../../assets/dummyQR.png')} style={styles.modalImage} />
            <TouchableOpacity style={styles.modalButton} onPress={handleCopyToClipboard}>
              <Text style={styles.modalButtonText}>Copy to Clipboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  content: {
    
    flex: 1,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginHorizontal: 20,
    textAlign: 'left',
  },
  info: {
    fontSize: 14,
    textAlign: 'left',
    marginHorizontal: 20,
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  photoList: {
    padding: 2,
  },
  photo: {
    width: itemSize,
    height: itemSize,
    margin: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
