import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, ActivityIndicator, Alert } from 'react-native';

const { width } = Dimensions.get('window');
const itemSize = (width - 40) / 2; // Ekran genişliğine göre boyut ayarlama

export default function HomeScreen({ route, navigation }) {
  const { userId } = route.params;
  console.log("HomeScreen - userId:", userId);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchEvents();
    } else {
      console.error("User ID is not provided.");
    }
  }, [userId]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://192.168.0.44:8000/events/${userId}`);
      if (!response.ok) {
        const data = await response.json();
        console.error("Error response data:", data);
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.eventContainer, { width: itemSize, height: itemSize }]}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
    >
      <Image source={{ uri: `http://192.168.0.44:8000/uploads/${item.event_profile_photo}` }} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    paddingHorizontal: 10,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10, // Satır arası boşluk azaltma
  },
  eventContainer: {
    alignItems: 'center',
    margin: 5, // Yatay boşluk azaltma
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  eventImage: {
    width: '100%',
    height: '80%',
  },
  eventTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    padding: 5,
  },
});
