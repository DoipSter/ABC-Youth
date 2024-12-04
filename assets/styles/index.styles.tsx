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
    },
    promptText: {
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 50,
      textAlign: 'center',
      color: '#fff',
      height: '10%',
    },
    categoryText: {
      fontSize: 20, // Adjust the size
      textAlign: 'center', // Center align the text
      color: '#fff', // Text color
      marginVertical: 10, // Spacing between items
    },

    largeText: {
      fontSize: 100,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10,
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
    exerciseCategory: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    exerciseDay: {
      width: '48%',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#b6292b',
      padding: 10,
      borderRadius: 20,
      marginVertical: 10,
    },
    exerciseDaySelected: {
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
  });

export default styles;