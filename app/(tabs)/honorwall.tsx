import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ImageBackground } from 'react-native';

export default function Tab() {
  const [editableText, setEditableText] = useState([
    'Archie Moore', 'Billy Moore', 'Terence Shigg', 'John Doe', 'Jane Doe', 'Michael Scott', 
    'Dwight Schrute', 'Jim Halpert', 'Pam Beesly', 'Ryan Howard'
  ]); // Example with 10 items to show scrolling

  return (
    <ImageBackground 
      source={require('@/assets/images/honor.png')} // Corrected file path
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        {/* If there are more than 6 items, wrap the list in a ScrollView */}
        <ScrollView style={styles.scrollContainer}>
          {/* Loop to generate 10 rectangular containers */}
          {editableText.map((text, index) => (
            <View key={index} style={styles.rectContainer}>
              <Text style={styles.label}>{index + 1}</Text>
              <TextInput 
                style={styles.editableText}
                value={editableText[index]}
                onChangeText={(text) => {
                  const newText = [...editableText];
                  newText[index] = text;
                  setEditableText(newText);
                }}
                placeholder={`Edit Label ${index + 1}`}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: '95%', // Adjust the width as per your requirement
    height: '75%', // This makes the container extend downwards
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background with opacity
    borderRadius: 20,
    marginTop: 10,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scrollContainer: {
    flex: 1,
    width: '100%', // Ensure the scroll view takes full width of the container
  },
  rectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333', // Dark grey background for each item
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#b6292b', // White text for label
  },
  editableText: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    height: 40,
    marginLeft: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#b6292b', // deep-red text
    fontFamily: 'Kollektif',
  },
});
