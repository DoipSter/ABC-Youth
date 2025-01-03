import React, { useState, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Alert, Text, Dimensions } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { useAdmin } from '@/context/adminContext'; // Import the hook
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase auth

export default function TabLayout() {
  const router = useRouter(); // Access the router to navigate after logout
  const { isAdmin, setIsAdmin } = useAdmin(); // Access and modify the state
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 }); // Dropdown position
  const headerRightRef = useRef(null); // Ref for the header-right button

  const handleLogout = async () => {
    try {
      const auth = getAuth(); // Get Firebase auth instance
      await signOut(auth); // Sign out the user from Firebase
      router.replace('/welcome'); // Redirect to the welcome screen
      setDropdownVisible(false); // Hide the dropdown
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const handleSettingsPress = () => {
    Alert.alert("Settings", "Settings option selected!");
    setDropdownVisible(false);
  };

  const handleAdminEditPress = () => {
    if (isAdmin) {
      Alert.alert(
        "Exit Edit Mode",
        "Do you want to exit edit mode?",
        [
          {
            text: "No",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              Alert.alert(
                "Save Changes",
                "Do you want to save your changes?",
                [
                  {
                    text: "No",
                    onPress: () => {
                      setIsAdmin(false); // Exit edit mode without saving
                      setDropdownVisible(false);
                    }
                  },
                  {
                    text: "Save",
                    onPress: () => {
                      // Call function to save changes here
                      setIsAdmin(false); // Exit edit mode after saving
                      setDropdownVisible(false); 
                    }
                  },
                ],
                { cancelable: false }
              );
            }
          },
        ],
        { cancelable: false }
      );
    } else {
      // Enter edit mode
      setIsAdmin(true);
      setDropdownVisible(false); 
    }
  };

  const toggleDropdown = () => {
    if (headerRightRef.current) {
      headerRightRef.current.measureInWindow((x, y, width) => {
        setDropdownPosition({ top: y + 50, right: Dimensions.get('window').width - x - width });
      });
    }
    setDropdownVisible(!isDropdownVisible); // Toggle visibility on press
  };

  return (
    <>
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
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 36,
            fontWeight: 'bold',
	    fontFamily: 'CODEPL',
            color: '#b6292b',
          },
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity
                ref={headerRightRef}
                onPress={toggleDropdown}
              >
                <FontAwesome name="user" size={30} color="#B6292B" />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            isAdmin && (
              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity onPress={handleAdminEditPress}>
                  <FontAwesome name="check-square" size={30} color="#B6292B" />
                </TouchableOpacity>
              </View>
            )
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

      {/* Dropdown Modal */}
      <Modal
        isVisible={isDropdownVisible}
        onBackdropPress={() => setDropdownVisible(false)} // Close modal on tapping outside
        backdropOpacity={0.5} // Slight opacity for backdrop
        animationIn="slideInRight" // Slide from the right
        animationOut="slideOutRight" // Slide out to the right
        style={[styles.modal, { top: dropdownPosition.top, right: dropdownPosition.right }]} // Adjust top to leave space for header
      >
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.option} onPress={handleSettingsPress}>
            <FontAwesome name="cog" size={20} color="#000" />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleAdminEditPress}>
            <FontAwesome name="edit" size={20} color="#000" />
            <Text style={styles.optionText}>Admin Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={20} color="#000" />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    margin: 0,
    zIndex: 1000, // Ensure the modal appears above other elements
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    fontFamily: 'CODEPL',
  },
});
