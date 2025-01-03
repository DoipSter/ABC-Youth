import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  Animated,
  StyleSheet,
  Vibration,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import {
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from 'firebase/app';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon library
import styles from '@/assets/styles/welcome.styles';

const firebaseConfig = {
  apiKey: 'AIzaSyDYG1IPmCg9CneBlRwZuPZ5BDQROCmTvNo',
  authDomain: 'abc-youth.firebaseapp.com',
  projectId: 'abc-youth',
  storageBucket: 'abc-youth.firebasestorage.app',
  messagingSenderId: '1072549013512',
  appId: '1:1072549013512:ios:10e1b81873706f0a81c9bd',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]; // Only initialize if it's not already initialized
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default function Welcome() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const shakeAnimation = useRef(new Animated.Value(0)).current; // Ref for shake animation
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/(tabs)'); // Replace with your main app route
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const clearSignUp = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAuthError('');
  };

  const handleLogin = async () => {
    if (email.length > 24) {
      setAuthError('Email must be 24 characters or less.');
      triggerShake();
      Vibration.vibrate(500);
      return;
    }
  
    if (password.length > 16) {
      setAuthError('Password must be 16 characters or less.');
      triggerShake();
      Vibration.vibrate(500);
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      clearSignUp();
      setLoginModalVisible(false);
      setAuthError('');
      router.replace('/(tabs)');
    } catch (error) {
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      }
      setAuthError(errorMessage);
      triggerShake();
      Vibration.vibrate(500);
    }
  };
  
  const handleSignUp = async () => {
    if (email.length > 32) {
      setAuthError('Email must be 32 characters or less.');
      triggerShake();
      Vibration.vibrate(500);
      return;
    }
  
    if (password.length > 32) {
      setAuthError('Password must be 32 characters or less.');
      triggerShake();
      Vibration.vibrate(500);
      return;
    }
  
    if (password !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      clearSignUp();
      setSignUpModalVisible(false);
      setLoginModalVisible(true);
      setAuthError('');
    } catch (error) {
      setAuthError('Sign-up failed. Please try again.');
      triggerShake();
      Vibration.vibrate(500);
    }
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B6292B" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('@/assets/images/abc-youth-logo-red.png')}
      style={styles.container}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLoginModalVisible(true)}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSignUpModalVisible(true)}
        >
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>

        <Link href="/about" style={[styles.button, { display: 'flex', alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={[styles.text, { marginTop: 5 }]}>About ABC</Text>
        </Link>
      </View>

      <Modal
        visible={isLoginModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setLoginModalVisible(false);
          setAuthError('');
        }}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={{
              ...styles.modalContainer,
              transform: [{ translateX: shakeAnimation }],
            }}
          >
            <Text style={styles.modalTitle}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.passwordIcon}onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {authError && <Text style={styles.errorText}>{authError}</Text>}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleLogin}
            >
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setLoginModalVisible(false);
                setAuthError('');
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      <Modal
        visible={isSignUpModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          clearSignUp();
          setSignUpModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={{
              ...styles.modalContainer,
              transform: [{ translateX: shakeAnimation }],
            }}
          >
            <Text style={styles.modalTitle}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.passwordIcon} onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity style={styles.passwordIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {authError && <Text style={styles.errorText}>{authError}</Text>}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSignUp}
            >
              <Text style={styles.modalButtonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setSignUpModalVisible(false);
                setAuthError('');
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

