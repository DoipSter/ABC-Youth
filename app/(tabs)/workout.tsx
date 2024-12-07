import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, Animated, Alert, Vibration, Easing, ActivityIndicator , StatusBar} from 'react-native';
import styles from '@/assets/styles/workout.styles';
import * as Progress from 'react-native-progress';

export default function Tab() {
  const [showCard, setShowCard] = useState(false); // Initially hide the card
  const [showCreateButton, setShowCreateButton] = useState(true); // Boolean to control Create Workout button visibility
  const [showGoBackButton, setShowGoBackButton] = useState(false); // Boolean to control Go Back button visibility
  const [workouts, setWorkouts] = useState([
    { name: 'STRETCH-OUT', sets: 1, reps: 1, time: 0, active: false, completed: false, done: false, progressIndex: 0, progress: 0},
    { name: 'SHADOW BOX', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, progressIndex: 0, progress: 0},
    { name: 'PUNCHING MITTS', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, progressIndex: 0, progress: 0 },
    { name: 'BAG WORK', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, progressIndex: 0, progress: 0},
    { name: 'DOUBLE-END BAG', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, progressIndex: 0, progress: 0 },
    { name: 'SPEED BAG', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, progressIndex: 0 , progress: 0},
    { name: 'SHADOW BOX', sets: 1, reps: 'Failure', time: 0, active: false, completed: false, done: false, progressIndex: 0 , progress: 0},
    { name: 'SIT-UPS', sets: 1, reps: '100', time: 0, active: false, completed: false, done: false, progressIndex: 0 },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({
    A: false,
    B: false,
    C: false,
    D: false,
  });

  const [mainTime, setMainTime] = useState(0); // Main timer state in milliseconds
  const [mainRunning, setMainRunning] = useState(false); // Is the main timer running
  const [activeWorkout, setActiveWorkout] = useState<number | null>(null); // The current active workout index
  const [workoutStarted, setWorkoutStarted] = useState(false); // Track if a workout has started
  const [workoutEnded, setWorkoutEnded] = useState(false); // Track if the workout has ended
  const [loading, setLoading] = useState(false); // State for loading animation
  const [canStartWorkout, setCanStartWorkout] = useState(false); // Track if the user can start the workout

  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const timerPosition = useRef(new Animated.Value(0)).current; // Position for sliding timer

  //scrollview logic
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if(showCard && !loading){
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [showCard, loading]);

  const scrollToActiveWorkout = (workoutIndex: number) => {
    if(scrollViewRef.current) {
      const workoutHeight = 145;
      scrollViewRef.current.scrollTo({ y: workoutIndex * workoutHeight, animated:true});
    }
  };

  // Main timer logic for workout tracking
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (mainRunning && !workoutEnded) {
      timer = setInterval(() => {
        setMainTime(prevTime => prevTime + 1000); // Increment the main timer by 1 second (1000ms)
        if (activeWorkout !== null) {
          setWorkouts(prevWorkouts => {
            const updatedWorkouts = [...prevWorkouts];
            updatedWorkouts[activeWorkout].time += 1000; // Increment workout time by 1 second (1000ms)
            return updatedWorkouts;
          });
        }
      }, 1000); // Update every second
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [mainRunning, activeWorkout, workoutEnded]);

  // Format workout time as min:sec
  const formatWorkoutTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Format total time at the bottom (hours:minutes:seconds)
  const formatTotalTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleProgress = (workoutIndex: number) => {
    if (workoutEnded || !workoutStarted || !workouts[workoutIndex].active) return;
  
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      const workout = updatedWorkouts[workoutIndex];
  
      // Increase the progressIndex when a set is completed
      if (workout.progressIndex < workout.sets) {
        workout.progressIndex += 1;
      }
  
      // Calculate progress (as a fraction of completed sets)
      workout.progress = workout.progressIndex / workout.sets;

      if (workout.progress === 1)
      {
        workout.completed = true;
        workout.active = false;

        const allWorkoutsCompleted = updatedWorkouts.every(w => w.completed);

        if(allWorkoutsCompleted){
          setWorkoutEnded(true);
          endWorkout();
        }
        else {
          const nextWorkoutIndex = updatedWorkouts.findIndex(w => !w.done && !w.completed);

          if(nextWorkoutIndex !== -1){
  
            updatedWorkouts[nextWorkoutIndex].active = true;
            setActiveWorkout(nextWorkoutIndex);
            scrollToActiveWorkout(nextWorkoutIndex);
          }
        }
      }
  
      return updatedWorkouts;
    });
  };
  

// Toggle category checkbox for the workout selection screen
const toggleCategory = (category: string) => {
  setSelectedCategories((prev) => {
    const updatedCategories: Record<string, boolean> = {...prev};
    // Set all categories to false except the selected one
    Object.keys(prev).forEach((key) => {
      updatedCategories[key] = key === category ? !prev[key] : false;
    });
    return updatedCategories;
  });
};


  // "Poof" animation for the button and slide animation for the timer
  const triggerPoofAndSlideAnimation = () => {
    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.exp), // Adds a smoother transition
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(timerPosition, {
        toValue: 100, // Move the timer to the button's position
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(); // Hide the button after animation
  };

  // Handle workout toggle with validation
  const toggleWorkout = (index: number) => {
    if (workoutEnded || !workoutStarted) return; // Disable workout selection if workout ended or hasn't started
  
    // Check if the current workout needs to be completed before switching
    if (activeWorkout !== null && activeWorkout !== index && workouts[activeWorkout]?.completed === false) {
      Alert.alert(
        'Incomplete Workout',
        `You must complete all sets of ${workouts[activeWorkout].name} before moving on to the next workout.`
      );
      return;
    }
  
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
  
      // Handle clicking on the active workout
      if (activeWorkout === index) {
        // Do nothing to the timer; simply toggle between active/completed states
        updatedWorkouts[index].completed = !updatedWorkouts[index].completed;
      } else {
        // Handle switching to a new workout
        if (activeWorkout !== null) {
          updatedWorkouts[activeWorkout].done = true;
          updatedWorkouts[activeWorkout].active = false;
          updatedWorkouts[activeWorkout].completed = false;
        }
  
        updatedWorkouts[index].active = true;
        updatedWorkouts[index].completed = false;
        updatedWorkouts[index].done = false;
        setActiveWorkout(index); // Set the new active workout
        setMainRunning(true); // Ensure the main timer is running
  
        // Trigger animation for UI feedback
        triggerPoofAndSlideAnimation();
      }
  
      return updatedWorkouts;
    });
  };
  

  const endWorkout = () => {
    setWorkoutStarted(false); // Hide the "End Workout" button
    setMainRunning(false); // Stop the main timer
    setWorkoutEnded(true); // Disable workout buttons
    setSelectedCategories({ A: false, B: false, C: false, D: false }); // Reset selected categories
    Alert.alert('Workout Completed.', 'Would you like to record todays workout?');
  };

  const handleCreateWorkout = () => {
    const selected = Object.keys(selectedCategories).filter((key) => selectedCategories[key]);
    if (selected.length === 0) {
      Alert.alert('Please select at least one category');
      return;
    }

    setLoading(true); // Show the loading animation
    setTimeout(() => {
      setCanStartWorkout(true); // Allow starting the workout
      setShowCard(true); // Show workout card
      setShowCreateButton(false); // Hide the create workout button after creation
      setShowGoBackButton(true); // Show the Go Back button after the card is created
      setLoading(false); // Hide the loading animation after 500ms
    }, 500); // .5-second delay
  };

  const handleStartWorkout = () => {
    Alert.alert(
      'Pick a Workout',
      'Choose your starting workout',
      workouts
        .filter(workout => !workout.done) // Show only workouts that aren't done
        .map((workout, index) => ({
          text: workout.name,
          onPress: () => {
            setWorkoutStarted(true); // Allow the workout to begin
            setCanStartWorkout(false); // Hide the start workout button
            setShowGoBackButton(false); // Hide the Go Back button when workout starts
            setActiveWorkout(index); // Set the chosen workout as the active one
            setMainRunning(true); // Start the main timer
            setWorkouts(prevWorkouts => {
              const updatedWorkouts = [...prevWorkouts];
              updatedWorkouts[index].active = true; // Set the chosen workout as active
              return updatedWorkouts;
            });

            triggerPoofAndSlideAnimation(); // Trigger the animation
          },
        })),
      { cancelable: true } // Allow the user to cancel the selection
    );
  };

  const handleGoBack = () => {
    setShowCard(false); // Hide workout card
    setShowCreateButton(true); // Show create button again
    setShowGoBackButton(false); // Hide Go Back button
    setWorkouts(workouts.map(workout => ({
      ...workout,
      time: 0,
      active: false,
      completed: false,
      done: false,
    }))); // Reset workouts
    setSelectedCategories({ A: false, B: false, C: false, D: false }); // Reset selected categories
  };

  const startNewWorkout = () => {
    setWorkoutEnded(false);
    setLoading(true); // Start the loading animation
    setMainRunning(false);
    setTimeout(() => {
      setWorkouts(workouts.map(workout => ({
        ...workout,
        time: 0,
        active: false,
        completed: false,
        done: false,
        progress:0, // Reset Progress
        progressIndex: 0, // Reset PIndex
      })));
      setMainTime(0);
      setActiveWorkout(null);
      setLoading(false); // Stop the loading animation
      setShowCard(false); // Show the workout picker again after the loading
      setShowCreateButton(true); // Make the create button visible
      setWorkoutStarted(false);
      setWorkoutEnded(false);
    }, 500); // .5-second delay
  };

  return (
    <ImageBackground 
    source={require('@/assets/images/abc-youth-gym-bag.png')}
    style={styles.container}
    >
      <View style={styles.container}>
        {!showCard && !loading && (
          <View style={styles.selectionContainer}>
            <Text style={styles.promptText}>Pick Your Exercises </Text>
            <View style={styles.exerciseCategory}>
              
            </View>
            <Animated.View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button} onPress={handleCreateWorkout}>
                <Text style={styles.buttonText}>Create Boxing Card</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
        {showCard && !loading && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Boxing Card</Text>
            <View style={styles.separator} />
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              indicatorStyle="black"
            >
              {workouts.map((workout, workoutIndex) => (
                <TouchableOpacity
                  key={workoutIndex}
                  style={[
                    styles.workoutItemContainer,
                    workout.done
                      ? styles.workoutDone
                      : workout.active
                      ? styles.workoutActive
                      : workout.completed
                      ? styles.workoutDone
                      : styles.workoutInactive,
                  ]}
                  onPress={() => {
                    if (!workout.done) {
                      toggleWorkout(workoutIndex);
                      toggleProgress(workoutIndex);
                    }
                  }}
                  disabled={workoutEnded} // Disable after workout ends
                
                >
                  <Text style={styles.workoutName}>{workout.name}{'\n'}</Text>
                  <Text style={styles.workoutSetsReps}>{workout.sets} x {workout.reps}</Text>
                  <Text style={styles.workoutTime}>{formatWorkoutTime(workout.time)}{'\n'}</Text>
                  <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 5}}>
                    <Progress.Bar
                      progress={workout.progress}
                      width={null} //Full Width of the container
                      height={25}
                      color="#000"
                      unfilledColor="rgba(0,0,0,0.35)"
                      borderWidth={0.35}
                      borderColor='#b6292b'
                      style={styles.progressBar}/>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Start Workout Button */}
            {canStartWorkout && (
              <TouchableOpacity style={styles.startWorkoutButton} onPress={handleStartWorkout}>
                <Text style={styles.startWorkoutButtonText}>Start Workout</Text>
              </TouchableOpacity>
            )}

            {/* End Workout Button */}
            {workoutStarted && !workoutEnded && (
              <TouchableOpacity style={styles.endWorkoutButton} onPress={endWorkout}>
                <Text style={styles.endWorkoutButtonText}>End Workout</Text>
              </TouchableOpacity>
            )}

            {/* Start New Workout Button */}
            {workoutEnded && (
              <TouchableOpacity style={styles.startNewWorkoutButton} onPress={startNewWorkout}>
                <Text style={styles.startNewWorkoutButtonText}>Start New Workout</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {showGoBackButton && !workoutStarted && showCard && (
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Text style={styles.goBackButtonText}>← Go Back</Text>
          </TouchableOpacity>
        )}
        {mainRunning && showCard && !workoutEnded && (
          <Animated.View style={[styles.timerContainer, { transform: [{ translateY: timerPosition }] }]}>
            <Text style={styles.timerText}>{formatTotalTime(mainTime)}</Text>
          </Animated.View>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading New Workout...</Text>
          </View>
        )}
      </View>
    </ImageBackground>
    );
  }