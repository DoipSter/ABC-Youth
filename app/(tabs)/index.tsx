import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Alert, Vibration, Easing, ActivityIndicator , StatusBar} from 'react-native';
import CheckBox from 'react-native-check-box'; // Import CheckBox component

export default function Tab() {
  const [showCard, setShowCard] = useState(false); // Initially hide the card
  const [showCreateButton, setShowCreateButton] = useState(true); // Boolean to control Create Workout button visibility
  const [showGoBackButton, setShowGoBackButton] = useState(false); // Boolean to control Go Back button visibility
  const [workouts, setWorkouts] = useState([
    { name: 'STRETCH-OUT', sets: 1, reps: 1, time: 0, active: false, completed: false, done: false, checkboxes: [false] },
    { name: 'SHADOW BOX', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, checkboxes: [false, false, false] },
    { name: 'PUNCHING MITTS', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, checkboxes: [false, false, false] },
    { name: 'BAG WORK', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, checkboxes: [false, false, false] },
    { name: 'DOUBLE-END BAG', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, checkboxes: [false, false, false] },
    { name: 'SPEED BAG', sets: 3, reps: 'Failure', time: 0, active: false, completed: false, done: false, checkboxes: [false, false, false] },
    { name: 'SHADOW BOX', sets: 1, reps: 'Failure', time: 0, active: false, completed: false, done: false, checkboxes: [false] },
    { name: 'SIT-UPS', sets: 1, reps: '100', time: 0, active: false, completed: false, done: false, checkboxes: [false] },
  ]);

  const [selectedCategories, setSelectedCategories] = useState({
    Upper: false,
    Lower: false,
    Cardio: false,
    Core: false,
  });

  const [mainTime, setMainTime] = useState(0); // Main timer state in milliseconds
  const [mainRunning, setMainRunning] = useState(false); // Is the main timer running
  const [activeWorkout, setActiveWorkout] = useState(null); // The current active workout index
  const [onBreak, setOnBreak] = useState(false); // State for break mode
  const [breakTime, setBreakTime] = useState(0); // Break timer
  const [workoutStarted, setWorkoutStarted] = useState(false); // Track if a workout has started
  const [workoutEnded, setWorkoutEnded] = useState(false); // Track if the workout has ended
  const [loading, setLoading] = useState(false); // State for loading animation
  const [canStartWorkout, setCanStartWorkout] = useState(false); // Track if the user can start the workout

  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const timerPosition = useRef(new Animated.Value(0)).current; // Position for sliding timer

  // Main timer logic for workout tracking
  useEffect(() => {
    let timer;
    if (mainRunning && !onBreak && !workoutEnded) {
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
  }, [mainRunning, onBreak, activeWorkout, workoutEnded]);

  // Break timer logic
  useEffect(() => {
    let breakTimer;
    if (onBreak && !workoutEnded) {
      breakTimer = setInterval(() => {
        setBreakTime(prevTime => prevTime + 1000); // Increment break time every second
      }, 1000);
    } else {
      clearInterval(breakTimer);
    }
    return () => clearInterval(breakTimer);
  }, [onBreak, workoutEnded]);

  // Format workout time as min:sec
  const formatWorkoutTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Format total time at the bottom (hours:minutes:seconds)
  const formatTotalTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Format break time as min:sec
  const formatBreakTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Check if all checkboxes in the active workout are checked
  const areAllCheckboxesChecked = (workout) => {
    return workout.checkboxes.every(checkbox => checkbox === true);
  };

  // Toggle checkboxes
  const toggleCheckbox = (workoutIndex, checkboxIndex) => {
    if (workoutEnded || !workoutStarted) return; // Disable toggle if the workout is ended or hasn't started
    Vibration.vibrate(100); // Give feedback!
    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];
      updatedWorkouts[workoutIndex].checkboxes[checkboxIndex] = !updatedWorkouts[workoutIndex].checkboxes[checkboxIndex];
      return updatedWorkouts;
    });
  };

  // Toggle category checkbox for the workout selection screen
  const toggleCategory = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
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
  const toggleWorkout = (index) => {
    if (workoutEnded || !workoutStarted) return; // Disable workout selection if workout ended or hasn't started
    if (activeWorkout !== null && activeWorkout !== index && !areAllCheckboxesChecked(workouts[activeWorkout])) {
      Alert.alert('Incomplete Workout', `You must complete all sets of ${workouts[activeWorkout].name} before moving on to the next workout.`);
      return;
    }

    if (onBreak) {
      endBreak();
    }

    setWorkouts(prevWorkouts => {
      const updatedWorkouts = [...prevWorkouts];

      if (activeWorkout === index) {
        if (updatedWorkouts[index].active && !updatedWorkouts[index].completed) {
          updatedWorkouts[index].active = false;
          updatedWorkouts[index].completed = true;
          setMainRunning(false); // Stop the main timer
          startBreak(); // Start the break timer automatically
        } else if (updatedWorkouts[index].completed) {
          updatedWorkouts[index].active = true;
          updatedWorkouts[index].completed = false;
          setMainRunning(true); // Resume the main timer
          endBreak(); // End break automatically
        }
      } else {
        if (activeWorkout !== null) {
          updatedWorkouts[activeWorkout].done = true;
          updatedWorkouts[activeWorkout].active = false;
          updatedWorkouts[activeWorkout].completed = false;
        }

        updatedWorkouts[index].active = true;
        updatedWorkouts[index].completed = false;
        updatedWorkouts[index].done = false;
        setActiveWorkout(index); // Set the new active workout
        setMainRunning(true); // Start the main timer

        triggerPoofAndSlideAnimation();
      }

      return updatedWorkouts;
    });
  };

  const startBreak = () => {
    setOnBreak(true);
    setBreakTime(0); // Reset break timer
  };

  const endBreak = () => {
    setOnBreak(false);
    setMainRunning(true); // Resume the main timer when the break ends
  };

  const endWorkout = () => {
    setWorkoutStarted(false); // Hide the "End Workout" button
    setMainRunning(false); // Stop the main timer
    setWorkoutEnded(true); // Disable workout buttons
    endBreak(); // End break if end workout is called
    Alert.alert('Good Job!', 'You have completed your workout.');
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
      checkboxes: workout.checkboxes.map(() => false)
    }))); // Reset workouts
    setSelectedCategories({ Upper: false, Lower: false, Cardio: false, Core: false }); // Reset selected categories
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
        checkboxes: workout.checkboxes.map(() => false)
      })));
      setMainTime(0);
      setActiveWorkout(null);
      setLoading(false); // Stop the loading animation
      setShowCard(false); // Show the workout picker again after the loading
      setShowCreateButton(true); // Make the create button visible
    }, 500); // .5-second delay
  };

  return (
    <View style={styles.container}>
      {!showCard && !loading && (
        <View style={styles.selectionContainer}>
          <Text style={styles.promptText}>Pick Your Exercise Day</Text>
          <View style={styles.checkBoxContainer}>
            {['DAY "A"', 'DAY "B"', 'DAY "C"', 'DAY "D"'].map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.checkBoxWrapper}
                onPress={() => toggleCategory(category)}
              >
                <CheckBox
                  style={styles.largeCheckBox}
                  onClick={() => toggleCategory(category)}
                  isChecked={selectedCategories[category]}
                  checkBoxColor="#b6292b" // Darker orange color
                />
                <Text style={styles.largeText}>{category}</Text>
              </TouchableOpacity>
            ))}
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
                    ? styles.workoutCompleted
                    : styles.workoutInactive,
                ]}
                onPress={() => !workout.done && toggleWorkout(workoutIndex)} // Make it unpressable if done
                disabled={workoutEnded} // Disable after workout ends
              >
                <Text style={styles.workoutTime}>{formatWorkoutTime(workout.time)}</Text>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutSetsReps}>{workout.sets} x {workout.reps}</Text>
                <View style={styles.checkboxContainer}>
                  {workout.checkboxes.map((checked, checkboxIndex) => (
                    <CheckBox
                      key={checkboxIndex}
                      style={styles.checkbox} // Style to minimize space
                      onClick={() => toggleCheckbox(workoutIndex, checkboxIndex)}
                      isChecked={checked}
                      checkBoxColor="#b6292b" // Darker orange for checkboxes
                      disabled={workoutEnded} // Disable checkbox after workout ends
                    />
                  ))}
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

      {onBreak && (
        <View style={styles.breakContainer}>
          <Text style={styles.breakText}>Break Time: {formatBreakTime(breakTime)}</Text>
          <TouchableOpacity style={styles.endBreakButton} onPress={endBreak}>
            <Text style={styles.endBreakText}>End Break</Text>
          </TouchableOpacity>
        </View>
      )}

      {!onBreak && mainRunning && showCard && !workoutEnded && (
        <Animated.View style={[styles.timerContainer, { transform: [{ translateY: timerPosition }] }]}>
          <Text style={styles.timerText}>{formatTotalTime(mainTime)}</Text>
        </Animated.View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b6292b" />
          <Text style={styles.loadingText}>Loading New Workout...</Text>
        </View>
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF', // White background
    paddingTop: 50,
  },
  promptText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    height: '20%',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
    height: '20%',
  },
  checkBoxWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  largeCheckBox: {
    marginRight: 10,
  },
  largeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#b6292b', // Darker orange background
    borderRadius: 15,
    borderColor: '#FFF', // White border
    borderWidth: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF', // White text for visibility
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#b6292b', // Darker orange separator line
    marginBottom: 20,
  },
  card: {
    width: '90%',
    height: 520, // Increased height for the card
    padding: 20,
    backgroundColor: '#FFF', // White background for the card
    borderRadius: 10,
    borderColor: '#b6292b', // Darker orange border for motivation
    borderWidth: 6,
    marginBottom: 10, // Space between card and create button
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  scrollContainer: {
    flex: 1, // Enable scrolling within the card
  },
  workoutItemContainer: {
    flexDirection: 'row', // Align workout, checkboxes in a single row
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    marginVertical: 3,
    backgroundColor: '#FFF', // White background for workout items
  },
  workoutTime: {
    fontSize: 16,
    width: 80, // Adjust width to push timer to the left
    textAlign: 'left',
    color: '#000',
  },
  workoutName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 0,
    color: '#000',
    fontWeight: 'bold',
  },
  workoutSetsReps: {
    fontSize: 16,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row', // Align checkboxes in a single row
  },
  checkbox: {
    margin: 0, // Remove margin
    padding: 0, // Remove padding
  },
  workoutInactive: {
    backgroundColor: '#D3D3D3',
  },
  workoutActive: {
    backgroundColor: '#FFE4B5', // Light orange for active
    color: '#333', // Darker text color for better contrast
  },
  workoutCompleted: {
    backgroundColor: '#FFDAB9', // Light orange for paused
  },
  workoutDone: {
    backgroundColor: '#90EE90', // Green background when completed
  },
  timerContainer: {
    position: 'absolute',
    bottom: 100, // Adjusted position to stay above the break button
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000', // Darker orange text for timer
  },
  endWorkoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#b6292b', // Darker orange background
    borderRadius: 10,
    borderColor: '#FFF', // White border
    borderWidth: 2,
    alignItems: 'center',
  },
  endWorkoutButtonText: {
    color: '#FFF', // White text for visibility
    fontSize: 18,
    fontWeight: 'bold',
  },
  startNewWorkoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#b6292b', // Darker orange background
    borderRadius: 10,
    borderColor: '#FFF', // White border
    borderWidth: 2,
    alignItems: 'center',
  },
  startNewWorkoutButtonText: {
    color: '#FFF', // White text for visibility
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#b6292b', // Tomato red background for the go back button
    borderRadius: 10,
    borderColor: '#FFF', // White border
    borderWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  goBackButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#b6292b', // Darker orange loading text
    fontSize: 18,
    fontWeight: 'bold',
  },
  breakContainer: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
  },
  breakText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Darker orange text for break
    marginBottom: 5,
  },
  endBreakButton: {
    padding: 10,
    backgroundColor: '#b6292b', // Darker orange for end break button
    borderRadius: 10,
    borderColor: '#FFF',
    borderWidth: 2,
  },
  endBreakText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startWorkoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#b6292b', // Darker orange background
    borderRadius: 10,
    borderColor: '#FFF', // White border
    borderWidth: 2,
    alignItems: 'center',
  },
  startWorkoutButtonText: {
    color: '#FFF', // White text for visibility
    fontSize: 18,
    fontWeight: 'bold',
  },
});
