// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';

const initialEvents = [
  { id: '1', title: 'Wedding', image: require('../../assets/wedding.jpeg') },
  { id: '2', title: 'First Meeting', image: require('../../assets/meeting.jpeg') },
];

const { width } = Dimensions.get('window');
const itemSize = (width - 40) / 2; // Ekran genişliğine göre boyut ayarlama

export default function HomeScreen({ route }) {
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    if (route.params?.newEvent) {
      setEvents([...events, route.params.newEvent]);
    }
  }, [route.params?.newEvent]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.eventContainer, { width: itemSize, height: itemSize }]}>
      <Image source={item.image} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
