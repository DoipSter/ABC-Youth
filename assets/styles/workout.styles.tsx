import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
    },
    selectionContainer: {
      flex: 1, 
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      width: '90%',
      borderRadius: 20,
      justifyContent: 'space-between',  // Keeps space between workout list and the button
      position: 'relative',  // Required for absolute positioning
    },
    promptText: {
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 50,
      textAlign: 'center',
      color: '#fff',
      height: '10%',
    },
    largeText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    buttonWrapper: {
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
    },
    button: {
      padding: 15,
      backgroundColor: '#000', // Darker orange background
      borderRadius: 15,
      borderColor: '#b6292b', // White border
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
      marginTop: 10,
      marginBottom: 20,
    },
    card: {
      width: 350,
      height: '85%', // Increased height for the card
      padding: 40,
      backgroundColor: 'rgba(0,0,0,0.75)', // shaded background
      borderRadius: 20,
      borderColor: '#b6292b', // Darker orange border for motivation
      borderWidth: 3,
      marginBottom: 10, // Space between card and create button
      marginTop: 10,
    },
    cardTitle: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 1,
      textAlign: 'center',
      color: '#fff',
    },
    scrollContainer: {
      flex: 1, // Enable scrolling within the card
      borderWidth: 0.25,
      borderColor: '#b6292b',
      borderRadius: 10,
      padding: 5,
    },
    scrollContentContainer: {
      paddingBottom: 100,
    },
    exerciseCategory: {
      flexDirection: 'column',
      flexGrow: 1,  // Ensures the container takes available space
      padding: 10,
      marginBottom: 90,  // Adjust this as needed based on your design
      borderWidth: 0.25,
      borderColor: '#b6292b',
      borderRadius: 5,
      marginRight: 10,
      marginLeft: 10,
      minHeight: 0,  // Prevents the container from overflowing
      flex: 1,  // Ensures that the content inside can expand to fit the screen
      overflow: 'hidden',  // Ensures items are clipped if they overflow
    },
    exerciseButton: {
      width: '100%',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#b6292b',
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 20,
      marginVertical: 6,
    },
    exerciseButtonSelected: {
      backgroundColor: '#fff',
      borderColor: '#000',
    },
    largeTextSelected: {
      color: '#000',
    },
    workoutItemContainer: {
      flexDirection: 'column', // Align workout, checkboxes in a single row
      alignItems: 'center',
      height: 135,
      marginTop: 5,
      padding: 5,
      borderRadius: 5,
      marginVertical: 3,
      backgroundColor: '#FFF', // White background for workout items
    },
    workoutTime: {
      fontSize: 16,
      width: 48, // Adjust width to push timer to the left
      textAlign: 'left',
      color: 'rgba(f,f,f,0.1)',
//      fontWeight: 'bold',
    },
    workoutName: {
      flex: 1,
      fontSize: 16,
      marginLeft: 0,
      color: '#fff',
      fontWeight: 'bold',
    },
    workoutSetsReps: {
      fontSize: 16,
      color: '#000',
    },
    workoutInactive: {
      backgroundColor: '#a999',
    },
    workoutActive: {
      backgroundColor: '#f999', // 
      color: '#333', // Darker text color for better contrast
    },
    workoutCompleted: {
      backgroundColor: '#FFDAB9AA', // For Paused
    },
    workoutDone: {
      backgroundColor: '#90EE90BB', // Green background when completed
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
      color: '#fff', // Darker orange text for timer
    },
    endWorkoutButton: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#000', // Darker orange background
      borderRadius: 10,
      borderColor: '#b6292b', // White border
      borderWidth: 1,
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
      backgroundColor: '#000', // Darker orange background
      borderRadius: 10,
      borderColor: '#b6292b', // White border
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
      backgroundColor: '#000', // Tomato red background for the go back button
      borderRadius: 10,
      borderColor: '#b6292b', // White border
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
      color: '#fff', // 
      fontSize: 18,
      fontWeight: 'bold',
    },
    startWorkoutButton: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#000', // Darker orange background
      borderRadius: 10,
      borderColor: '#b6292b', // White border
      borderWidth: 2,
      alignItems: 'center',
    },
    startWorkoutButtonText: {
      color: '#FFF', // White text for visibility
      fontSize: 18,
      fontWeight: 'bold',
    },
    progressBar: {
      marginTop: 1,
      height: 25,
      borderRadius: 0,
      transform: [
        { skewX: '-30deg' },
      ],
//      backgroundColor: '#b6292b',
    },
    editButton: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        padding: 15,
        backgroundColor: '#000',
        width: 65,
        height: 65,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        left: '45%',
        transform: [{ translateX: -20 }],
        padding: 0,
        backgroundColor: '#000',
        borderRadius: 50,
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    deleteButton: {
        position: 'absolute',
        alignItems: 'center',
        top: 10,
        right: 10,
        padding: 5,
        backgroundColor: '#b6292b',
        borderRadius: 50,
        height: 30,
        width: 30,
    },
  });

export default styles;
