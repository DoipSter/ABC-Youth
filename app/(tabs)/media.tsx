import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Text, 
  ImageBackground, 
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@/assets/styles/media.styles';
import { useAdmin } from '@/context/adminContext';

export default function Tab() {
  const { isAdmin } = useAdmin();
  const [videoIds, setVideoIds] = useState([
    "ABi_t6HAHy4", // Initial video ID
  ]);
  const [isEditable, setIsEditable] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState("");

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddVideo = () => {
    const videoId = extractVideoId(newVideoUrl);
    if (!videoId) {
      Alert.alert("Invalid URL", "Please enter a valid YouTube video URL.");
      return;
    }

    setVideoIds([...videoIds, videoId]);
    setNewVideoUrl(""); // Clear the input field
  };

  const handleDeleteVideo = (index: number) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this video?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteVideo(index) },
      ]
    );
  };

  const deleteVideo = (index: number) => {
    const updatedVideos = videoIds.filter((_, i) => i !== index);
    setVideoIds(updatedVideos);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust keyboard behavior
    >
      <ImageBackground     
        source={require('@/assets/images/boxing-ring-dark.png')}
        style={styles.container}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ paddingBottom: 100 }} // Adjust padding for better scrolling when keyboard is open
          >
            {videoIds.map((videoId, index) => (
              <View key={index} style={styles.videoContainer}>
                <WebView
                  style={styles.video}
                  javaScriptEnabled={true}
                  allowsFullscreenVideo={true}
                  source={{
                    uri: `https://www.youtube.com/embed/${videoId}`,
                  }}
                  startInLoadingState={true}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                />
                {isEditable && (
                  <TouchableOpacity
                    onPress={() => handleDeleteVideo(index)}
                    style={styles.deleteButton}
                  >
                    <Icon name="trash" size={20} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {isEditable && isAdmin && (
              <View style={styles.addVideoContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter YouTube video URL"
                  placeholderTextColor={'#000'}
                  value={newVideoUrl}
                  onChangeText={setNewVideoUrl}
                  onFocus={() => {}}
                />
              </View>
            )}
            {isEditable && isAdmin && (
              <View style={styles.addButtonContainer}>
                <TouchableOpacity onPress={handleAddVideo} style={styles.addButton}>
                  <Icon name="plus" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          {isAdmin && (
            <TouchableOpacity
              onPress={() => setIsEditable(prevState => !prevState)} // Toggle isEditable on press
              style={styles.editButton}
            >
              <Icon name={isEditable ? "check" : "pencil"} size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
