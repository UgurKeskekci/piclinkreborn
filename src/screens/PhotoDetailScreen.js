import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';

export default function PhotoDetailScreen({ route }) {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={photo.image} style={styles.photo} />
      <Text style={styles.description}>{photo.description}</Text>
      <Text style={styles.commentsTitle}>Comments:</Text>
      <FlatList
        data={photo.comments}
        renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  photo: {
    width: '100%',
    height: width,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    marginBottom: 5,
  },
});
