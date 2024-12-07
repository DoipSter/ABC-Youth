import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, Link } from 'expo-router';

export default function Welcome() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time (e.g., fetching resources, loading images)
    const loadAssets = async () => {
      // Simulate a delay (use this or remove if you load actual assets)
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay
      setIsLoading(false); // Set loading to false once done
    };

    loadAssets();
  }, []);

  if (isLoading) {
    // Show a loading spinner while app is loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B6292B" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleLogin = () => {
    setLoginModalVisible(false);
    router.replace('/(tabs)'); // Navigate to the tabs screen after login
  };

  return (
    <ImageBackground
      source={require('@/assets/images/abc-youth-logo-red.png')}
      style={styles.container}
    >
      <View style={styles.buttonContainer}>
        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLoginModalVisible(true)}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        {/* Sign-Up Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSignUpModalVisible(true)}
        >
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>

        {/* About ABC Link */}
        <Link href="/about" style={styles.button}>
          <Text style={styles.text}>ABOUT ABC</Text>
        </Link>
      </View>

      {/* Login Modal */}
      <Modal
        visible={isLoginModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={true}
            />
            <TouchableOpacity
              onPress={() => setLoginModalVisible(false)}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={handleLogin}
            >
              <Text style={styles.modalButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLoginModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLoginModalVisible(false);

                setTimeout(() => {
                  setSignUpModalVisible(true);  // Open the sign-up modal after 1 second
                }, 600);  // 1000ms = 1 second
              }}
              >
                <Text style={styles.notRegisteredText}> Not Registered? <Text style={styles.createText}>Create an account </Text> </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sign-Up Modal */}
      <Modal
        visible={isSignUpModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSignUpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSignUpModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSignUpModalVisible(false);

                setTimeout(() => {
                  setLoginModalVisible(true);  // Open the sign-up modal after 1 second
                }, 600);  // 1000ms = 1 second
              }}
              >
                <Text style={styles.notRegisteredText}> Already Registered? <Text style={styles.createText}>Sign in </Text> </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '60%',
    backgroundColor: '#000',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    marginTop: 10,
    paddingTop: 70,
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: '30%',
    marginVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: '#b6292b',
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 2,
    textAlign: 'center',
    fontFamily: 'CODEL',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    fontSize: 20,
    color: '#B6292B',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 2,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#b6292b',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotText: {
    color: '#b6292b',
    fontSize: 16,
    marginTop: 0,
    marginBottom: 10,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  createText: {
    color: '#b6292b',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 0,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  notRegisteredText: {
    color: '#999',
    marginTop: 10,
    marginBottom: 0,
  },
});
