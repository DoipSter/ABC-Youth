import { StyleSheet } from "react-native";


// Example style for WebView container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    width: '95%',
    marginVertical: 10,
    alignSelf: 'center',
    top: 20,
    borderColor: '#b6292b',
    borderWidth: 2,
    borderRadius: 12,
  },
  video: {
    width: '100%',
    height: 200, // You can adjust the height as needed
  },
});


export default styles;