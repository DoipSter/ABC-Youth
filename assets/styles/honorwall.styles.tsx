import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000'
    },
    mainContainer: {
      width: '95%',
      height: '60%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: 20,
      marginTop: 10,
      padding: 20,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    mainContainerNoAdmin: {
      marginTop: 20, // Adjust this value to match the height of the edit button
    },
    scrollContainer: {
      flex: 1,
      width: '100%',
    },
    scrollContentContainer: {
      paddingBottom: 100, // Add extra padding at the bottom to avoid overlap with the button
    },
    rectContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#000',
      borderColor: '#b6292b',
      borderWidth: 1,
      marginBottom: 10,
      padding: 15,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    imageContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#b6292b',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    quoteContainer: {
      width: '93%',
      height: '33%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      borderRadius: 80,
      borderWidth: 1,
      borderColor: '#b6292b',
    },
    quoteText: {
      textAlign: 'center',
      color: '#f4f4f4',
      fontSize: 28,
      fontWeight: 'bold',
//      fontFamily: 'CODEL',
      marginLeft: 3,
      marginRight: 3,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 25,
      opacity: 0.7,
    },
    editableText: {
      fontSize: 28,
      fontWeight: 'bold',
//      fontFamily: 'CODEB',
      flex: 1,
      height: 50,
      marginLeft: 10,
      paddingLeft: 10,
      color: '#fff',
    },
    editableTextHighlight: {
      borderColor: '#b6292b',
      borderWidth: 2,
      backgroundColor: '#333',
    },
    deleteButton: {
      marginLeft: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
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
      bottom: 20,
      left: '50%',
      transform: [{ translateX: -20 }],
      padding: 15,
      backgroundColor: '#000',
      borderRadius: 50,
      height: 65,
      width: 65,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
  });


export default styles;