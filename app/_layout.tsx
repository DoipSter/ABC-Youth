import { Stack } from 'expo-router/stack';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { AdminProvider } from '@/context/adminContext'; // Import the provider
import { Slot } from 'expo-router';  // Your navigation or route system

export default function Layout() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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


