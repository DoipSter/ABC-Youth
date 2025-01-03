import { Stack } from 'expo-router/stack';
import { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AdminProvider } from '@/context/adminContext'; // Import the provider
import * as Font from 'expo-font';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume you check login status somewhere
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false); // Added state to track if app is ready
  const router = useRouter();

  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          'CODE-Bold': require('@/assets/fonts/CODE-Bold.otf'),
          'CODE-Light': require('@/assets/fonts/CODE-Light.otf'),
          'CODEPL': require('@/assets/fonts/SourceCodePro-Light.ttf'),
          'CODEPEB': require('@/assets/fonts/SourceCodePro-ExtraBold.ttf'),
          'CODEPB': require('@/assets/fonts/SourceCodePro-Bold.ttf'),
          'CODEPM': require('@/assets/fonts/SourceCodePro-Medium.ttf'),
        });
        setFontLoaded(true);
      } catch (error) {
        console.error('Error loading font', error);
      }
    }

    loadFont();
  }, []);

  // Ensure navigation happens after everything is ready
  useEffect(() => {
    if (fontLoaded) {
      setIsReady(true); // Set isReady to true after font is loaded
    }
  }, [fontLoaded]);

  useEffect(() => {
    if (isReady) {
      if (isLoggedIn) {
        router.replace('/(tabs)');
      } else {
        router.replace('/welcome');
      }
    }
  }, [isReady, isLoggedIn, router]);

  if (!fontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <AdminProvider>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
      </Stack>
    </AdminProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'CODE-Bold', // Use custom font
  },
});



