import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#B6292B',
      tabBarInactiveTintColor: '#FFFFFF',
      headerShown: true,
      tabBarStyle: {
        backgroundColor: '#000000'
      },
      headerStyle: {
        backgroundColor: '#000000'
      },
      headerTitleStyle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#B6292B',
        fontFamily: 'kollektif',
      }
     }}>
      <Tabs.Screen
        name="honorwall"
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
        name="index"
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
