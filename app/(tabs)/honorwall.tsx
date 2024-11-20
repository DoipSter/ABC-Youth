import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ImageBackground, Animated} from 'react-native';

export default function Tab() {
  const [editableText, setEditableText] = useState([
    'Archie Moore', 'Billy Moore', 'Terence Shigg', 'John Doe', 'Jane Doe', 'Michael Scott', 
    'Dwight Schrute', 'Jim Halpert', 'Pam Beesly', 'Ryan Howard'
  ]);

  return (
    <ImageBackground 
      source={require('@/assets/images/honor.png')}
      style={styles.container}
    >
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer}>
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
    width: '95%',
    height: '75%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    marginTop: 10,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  rectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#444', // Darker background for contrast
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6, // Adds shadow for Android
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b6292b', // A bright yellow to contrast with dark background
    marginRight: 15,
  },
  editableText: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    height: 50,
    marginLeft: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    color: '#333',
    fontFamily: 'Kollektif',
    borderWidth: 2,
    borderColor: '#b6292b', // Yellow border for the input field
//    transition: 'all 0.3s ease', // Smooth transition for focus effect
  },
  editableTextFocused: {
    borderColor: '#b6292b', // Change border color on focus
    backgroundColor: '#f9f9f9',
  }
});
