// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const events = [
  { id: '1', title: 'Wedding', image: require('../../assets/wedding.jpeg') },
  { id: '2', title: 'First Meeting', image: require('../../assets/meeting.jpeg') },
  { id: '3', title: 'Happy Hour', image: require('../../assets/happyhour.jpeg') },
  { id: '4', title: 'Conference', image: require('../../assets/conference.jpeg') },
];

export default function HomeScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.eventContainer}>
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
    paddingTop: 16,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  eventContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  eventImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  eventTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
