import { StyleSheet } from "react-native";


// Example style for WebView container
const styles = StyleSheet.create({
  container: {
    flex: 1,
//    backgroundColor: '#000',
  },
  videoContainer: {
    width: '95%',
    marginVertical: 10,
    alignSelf: 'center',
    top: 20,
    borderColor: '#b6292b',
    borderWidth: 1,
//    borderRadius: 12,
  },
  video: {
    width: '100%',
    height: 200, // You can adjust the height as needed
  },
  addVideoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: '#fff',
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
  addButtonContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 100,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
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
  scrollContainer: {
    paddingBottom: 20, // Give space for the floating button
  },
  
});


export default styles;