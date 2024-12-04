import React from 'react';
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAdmin } from '@/context/adminContext'; // Import the hook

export default function TabLayout() {
  const router = useRouter(); // Access the router to navigate after logout
  const { isAdmin, setIsAdmin } = useAdmin(); // Access and modify the state

  const handleLogout = () => {
    router.replace('/welcome');
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      Alert.alert(
        "Save Changes",
        "Do you want to save your changes?",
        [
          {
            text: "No",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => setIsAdmin(false),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Enter Edit Mode",
        "Do you want to enter edit mode?",
        [
          {
            text: "No",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => setIsAdmin(true),
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#B6292B',
        tabBarInactiveTintColor: '#FFFFFF',
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderColor: '#000000',
        },
        headerStyle: {
          backgroundColor: '#000000',
          height: 110,
        },
        headerTitleAlign: 'center', // Force the header title to be centered
        headerTitleStyle: {
          fontSize: 36,
          fontWeight: 'bold',
          color: '#B6292B',
          fontFamily: 'CODE',
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={handleLogout}>
              <FontAwesome name="user" size={30} color="#B6292B" />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={toggleAdmin}>
              <FontAwesome name="check-square" size={30} color="#B6292B" />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Honor Wall',
          tabBarIcon: ({ color }) => <FontAwesome size={30} name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color }) => <FontAwesome size={30} name="child" color={color} />,
        }}
      />
      <Tabs.Screen
        name="media"
        options={{
          title: 'Videos',
          tabBarIcon: ({ color }) => <FontAwesome size={30} name="camera" color={color} />,
        }}
      />
    </Tabs>
  );
}
