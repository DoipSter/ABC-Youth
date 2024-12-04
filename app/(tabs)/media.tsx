import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '@/assets/styles/media.styles';

export default function Tab() {
  const videoIds = [
    "ABi_t6HAHy4", // Video ID (without '?si=...' part)
  ];

  return (
    <ScrollView style={styles.container}>
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
            mediaPlaybackRequiresUserAction={false} // Optional, allows autoplay if needed
          />
        </View>
      ))}
    </ScrollView>
  );
}
