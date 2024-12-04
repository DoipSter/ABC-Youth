import { Stack } from 'expo-router/stack';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AdminProvider } from '@/context/adminContext'; // Import the provider
import { useFonts } from 'expo-font';

export default function Layout() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

//  const [ isReady, setIsReady ] = useState(true);
//  const [ fontsLoaded ] = useFonts({
//    'CODEL': require('@/assets/fonts/SourceCodePro-Light.ttf'),
//    'CODEB': require('@/assets/fonts/SourceCodePro-Bold.ttf'),
//  });

//  if (!fontsLoaded || !isReady) {
    // Display a loading spinner until fonts are ready
//    return (
//    <View style={styles.loadingContainer}>
//        <ActivityIndicator size="large" color="#B6292B" />
//      </View>
//    );
//  }

  useEffect(() => {
    if (isLoggedIn){
      router.replace('/(tabs)');
    } else {
      router.replace('/welcome');
    }
  }, [isLoggedIn]);

  return (
    <AdminProvider>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="about" options={{ headerShown: false}} />
      </Stack>
    </AdminProvider>
  );
}

//const styles = StyleSheet.create ({
//
//  loadingContainer: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//  }
//})


