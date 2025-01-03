import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '@/assets/styles/events.styles'; // style sheet for events
import { useAdmin } from '@/context/adminContext'; // Import the hook

export default function Tab() {
  const { isAdmin, setIsAdmin } = useAdmin();
  const MAX_EVENTS = 30;

const [events, setEvents] = useState([
  {
    id: '1',  // Unique identifier for each event
    name: "Boxing Event",
    date: "Nov 25, 2024",
    location: "Madison Square Garden",
    image: require('@/assets/images/boxing-ring.png'),
  },
]);

  const [isEditable, setIsEditable] = useState(false);
  const scrollViewRef =  useRef<ScrollView | null>(null);

  const handleEdit = () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      // Scroll to the bottom when entering edit mode
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } else {
      // Scroll to the top when exiting edit mode
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

    const handleDelete = (eventId: string) => {
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this event?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", onPress: () => deleteEvent(eventId) },
        ]
      );
    };


    const deleteEvent = (eventId: string) => {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
    };

    const handleAdd = () => {
      if (events.length >= MAX_EVENTS) {
        Alert.alert(
          "Limit Reached",
          `You cannot add more than ${MAX_EVENTS} events. Please delete an event before adding a new one.`
        );
        return;
      }

      const newEvent = {
        id: Date.now().toString(), // Unique identifier using the current timestamp
        name: "New Event",
        date: "Enter Date",
        location: "Enter Location",
        image: require('@/assets/images/boxing-ring.png'), // Default placeholder image
      };

      setEvents([...events, newEvent]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    };


  return (
    <ImageBackground
      source={require('@/assets/images/events-background.png')}
      style={styles.container}
    >
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
        >
{events.map((event) => (
  <View key={event.id} style={styles.eventsWrapper}> 
    <ImageBackground
      source={event.image}
      style={styles.eventContainer}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        {isEditable ? (
          <>
            <TextInput
              style={styles.editableText}
              value={event.name}
              onChangeText={(text) => {
                const updatedEvents = [...events];
                updatedEvents.find(e => e.id === event.id).name = text;
                setEvents(updatedEvents);
              }}
            />
            <TextInput
              style={styles.editableText}
              value={event.date}
              onChangeText={(text) => {
                const updatedEvents = [...events];
                updatedEvents.find(e => e.id === event.id).date = text;
                setEvents(updatedEvents);
              }}
            />
            <TextInput
              style={styles.editableText}
              value={event.location}
              onChangeText={(text) => {
                const updatedEvents = [...events];
                updatedEvents.find(e => e.id === event.id).location = text;
                setEvents(updatedEvents);
              }}
            />
            <TouchableOpacity
              onPress={() => handleDelete(event.id)} 
              style={styles.deleteButton}
            >
              <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDetails}>{event.date}</Text>
            <Text style={styles.eventDetails}>{event.location}</Text>
          </>
        )}
      </View>
    </ImageBackground>
  </View>
))}

        </ScrollView>

        {isEditable && (
          <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
            <Icon name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        )}

        {isAdmin && (
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Icon name={isEditable ? "check" : "pencil"} size={30} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}
