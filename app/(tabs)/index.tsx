import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@/assets/styles/honorwall.styles'; //import styles for honorwall tab
import { useAdmin } from '@/context/adminContext'; // Import the hook

export default function Tab() {
  const { isAdmin } = useAdmin();
  const [editableText, setEditableText] = useState([
    'Archie Moore', 'Billy Moore', 'Terence Shigg', 'John Doe', 'Jane Doe', 'Michael Scott',
    'Dwight Schrute', 'Jim Halpert', 'Pam Beesly', 'Ryan Howard'
  ]);
  const [isEditable, setIsEditable] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleEdit = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      }, 100);
    } else {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleDelete = (index: number) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteItem(index) }
      ]
    );
  };

  const deleteItem = (index: number) => {
    const newText = editableText.filter((_, i) => i !== index);
    setEditableText(newText);
  };

  const handleAdd = () => {
    if (editableText.length < 99) {
      const newName = `New ${editableText.length + 1}`;
      setEditableText([...editableText, newName]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } else {
      alert('Maximum limit of 99 entries reached.');
    }
  };

  return (
    <ImageBackground 
      source={require('@/assets/images/honor.png')}
      style={styles.container}
    >
      {/* Main content */}
      {!isAdmin && (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
           "When a TASK is once BEGUN. NEVER leave until it is DONE... If the labor is GREAT or SMALL.. Do it WELL or NOT AT ALL."
          </Text>
        </View>
      )}
      <View 
        style={[
            styles.mainContainer,
            !isAdmin && styles.mainContainerNoAdmin,
            isAdmin && { height: '80%' }
        ]}
      >
        <ScrollView 
          style={styles.scrollContainer} 
          ref={scrollViewRef} 
          contentContainerStyle={styles.scrollContentContainer}
        >
          {editableText.map((text, index) => (
            <View key={index} style={styles.rectContainer}>
              <View style={styles.imageContainer}>
                <Image 
                  source={require('@/assets/images/honor_transparent_logo.png')} 
                  style={styles.image}
                />
              </View>
              <TextInput 
                style={[styles.editableText, isEditable && styles.editableTextHighlight]}
                value={editableText[index]}
                onChangeText={(text) => {
                  if (isEditable) {
                    const newText = [...editableText];
                    newText[index] = text;
                    setEditableText(newText);
                  }
                }}
                placeholder={`Edit Label ${index + 1}`}
                editable={isEditable}
                selection={isEditable ? { start: editableText[index].length, end: editableText[index].length } : undefined}
              />
              {isEditable && (
                <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                  <Icon name="trash" size={20} color="#b6292b" />
                </TouchableOpacity>
              )}
            </View>
          ))}
          
          {isEditable && (
            <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
              <Icon name="plus" size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {/* Edit button at the bottom-right */}
      {isAdmin && (
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Icon name={isEditable ? "check" : "pencil"} size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}
