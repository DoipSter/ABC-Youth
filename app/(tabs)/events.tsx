import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function Tab() {
  const event = {
    name: "Music Concert",
    date: "Nov 25, 2024",
    location: "Madison Square Garden",
    image: require('@/assets/images/event.jpg'), // Replace with your image path
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={event.image}
        style={styles.eventContainer}
        imageStyle={styles.backgroundImage} // For styling the background image
      >
        <View style={styles.overlay}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventDetails}>{event.date}</Text>
          <Text style={styles.eventDetails}>{event.location}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background for contrast
  },
  eventContainer: {
    width: '90%', // Adjust width as needed
    height: 200, // Adjust height as needed
    borderColor: '#000000', // Black border
    borderWidth: 2, // Thickness of the border
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Ensures rounded corners apply to image
  },
  backgroundImage: {
    resizeMode: 'cover', // Ensures the image covers the container
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b6292b', // White text for contrast
    marginBottom: 10,
  },
  eventDetails: {
    fontSize: 16,
    color: '#b6292b', // White text
  },
});
