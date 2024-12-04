import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function About() {
  const router = useRouter();
  const [isMissionVisible, setMissionVisible] = useState(false);
  const [isFounderVisible, setFounderVisible] = useState(false);
  const [isTeamVisible, setTeamVisible] = useState(false);

  return (
    <View style={styles.blackBG}>
      <ImageBackground
        source={require('@/assets/images/abc-youth-logo-red.png')}
        style={styles.imageContainer}
      >
        <View style={styles.container}>
          {/* Back Button */}
          <View style={styles.backButtonContainer}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="#000"
              style={styles.backIcon}
              onPress={() => router.back()}
            />
            <Text style={styles.backText} onPress={() => router.back()}>
              Back
            </Text>
          </View>

          {/* Mission Button */}
          <ImageBackground
            source={require('@/assets/images/honor_transparent_logo.png')}
            style={styles.buttonImageBackground}
            imageStyle={styles.imageStyle}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => setMissionVisible(true)}
            >
              <Text style={styles.buttonText}>
                Our Mission
              </Text>
            </TouchableOpacity>
          </ImageBackground>

          {/* Founder Button */}
          <ImageBackground
            source={require('@/assets/images/archie-moore-ring.png')}
            style={styles.buttonImageBackground}
            imageStyle={styles.imageStyle}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFounderVisible(true)}
            >
              <Text style={styles.buttonText}>
                Our Founder
              </Text>
            </TouchableOpacity>
          </ImageBackground>

          {/* Team Button */}
          <ImageBackground
            source={require('@/assets/images/abc-team.png')}
            style={styles.buttonImageBackground}
            imageStyle={styles.imageStyle}
          >
            <TouchableOpacity 
              style={styles.button}
              onPress={() => setTeamVisible(true)}>
              <Text style={styles.buttonText}>
                ABC Team
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ImageBackground>

      {/* Mission Modal */}
      <Modal
        visible={isMissionVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMissionVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>  
            <View style={styles.modalMissionHeader}>
              <ImageBackground
                source={require('@/assets/images/honor_transparent_logo.png')} // Replace with your image path
                style={styles.headerImage}
              />
              <Text style={styles.headerText}>
                {/* Replace this with the title text */}
                {"Our\nMission\n at ABC"}
              </Text>
            </View>
            {/* Content */}
            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.modalText}>
                {/* Replace this with your mission text */}
                {" The"} program presents a positive
                alternative to the widespread
                drug and gang violence in the
                communities we serve. Boxers
                actively maintain focus and
                determination while collaborating
                with their peers and ABC’s
                coaches. Many people may recall
                our former head coach, Art
                Wilson, who collaborated with
                Billy Moore for over two decades.
                Together, they nurtured boxing
                champions and, more
                importantly, fostered
                well-rounded individuals. Our head 
                coach Victor Worsham and other
                volunteer coaches currently lead
                the way, empowering our youth to
                achieve both their athletic and
                life goals.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMissionVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Founder Modal */}
      <Modal
        visible={isFounderVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFounderVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header with Image and Text */}
            <View style={styles.modalFounderHeader}>
              <ImageBackground
                source={require('@/assets/images/archie-moore-ring.png')} // Replace with your image path
                style={styles.headerImage}
              />
              <Text style={styles.headerText}>
                {/* Replace this with the title text */}
                {"THE VISION\nOF\n"}
              <Text style={{ color: '#b6292b' }}>
                {"A LEGEND"}</Text>
              </Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.modalText}>
                {/* Replace this with your founder text */}
                {" ABC Youth Foundation was started by boxing Legend"},
                <Text style={{ color: '#b6292b' }}>
                  {" Archie Moore"}
                </Text>
                {" in 1957."}
                {" Archie was more than a boxer"},
                {" he was a visionary who predicted a violent drug and"}
                {" gang epidemic that would trouble our nation. He proposed"}
                {" a simple solution: prevention. With this idea in mind,"} 
                {" the Any Boy Can Youth Foundation was formed"} 
                {" (later renamed Any Body Can Youth Foundation). Archie"}
                {" used the lure of boxing to instill discipline,"}
                {" respect, and other positive values into the lives"} 
                {" of youth to prevent them from falling into dangerous lifestyles.\n\n"}


                {" The ABC Youth Foundation, founded by boxing legend Archie"}
                {" Moore, is dedicated to providing after school mentorship and"}
                {" fitness programs that empower San Diego’s youth. With a"} 
                {" mission to keep teens engaged, active, and focused on their"} 
                {" future, the foundation offers a safe and supportive environment"}
                {" where young people can thrive. Archie Moore’s legacy of"} 
                {" discipline and perseverance lives on through these programs,"}
                {" helping inner-city youth develop essential life skills both"} 
                {" in and out of the gym.\n\n"}


                {" Today, the ABC Youth Foundation is proudly carried on by"}
                {" Archie Moore’s son,"}
                <Text style={{ color: '#b6292b' }}>
                  {" Billy Moore,"}
                </Text> 
                {" who continues his father’s"}
                {" vision of transforming lives through mentorship and fitness."}
                {" Under Billy’s leadership, the foundation remains a vital part"}
                {" of the San Diego community, offering guidance, education, and"}
                {" a sense of belonging to local teens. The programs at ABC Youth"}
                {" Foundation not only foster physical fitness but also build"} 
                {" character and resilience, ensuring that the youth of San Diego"} 
                {" have the tools they need to succeed.\n\n"}


                {" Billy Moore became deeply involved and held the torch on his"} 
                {" journey of service when his faith of the Holy Spirit guided him"} 
                {" and called upon him to restart the organization 26 years ago."} 
                {" Furthering the mission of empowering our youth to thrive, Billy"}
                {" Moore’s leadership at Anybody Can Youth Foundation today has"} 
                {" been fruitful and has touched the lives of countless young individuals!\n\n"} 
                "
                <Text style={{ color: '#b6292b' }}>
                  {"ANYBODY CAN ACHIEVE THEIR FULLEST POTENTIAL!"}  
                </Text>
                "
                {"\n– Archie Moore"}
              </Text>
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFounderVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Team Modal */}
      <Modal
        visible={isTeamVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setTeamVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header with Image and Text */}
            <View style={styles.modalFounderHeader}>
              <ImageBackground
                source={require('@/assets/images/abc-team.png')} // Replace with your image path
                style={styles.headerImage}
              />
              <Text style={styles.headerText}>
                {/* Replace this with the title text */}
                {"Our Team\n"}
              <Text style={{ color: '#b6292b' }}>
                {"At ABC"}</Text>
              </Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.modalScrollView}>
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTeamVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  blackBG: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    height: '60%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 55,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 5,
  },
  backText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonImageBackground: {
    top: 80,
    height: 200,
    width: '100%',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000',
  },
  button: {
    flex: 1,
  },
  imageStyle: {
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  buttonText: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalFounderHeader: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center',
    marginBottom: 20, // Add spacing below the header
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  modalMissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  headerImage: {
    width: 150, // Adjust width as needed
    height: 100, // Adjust height as needed
    borderRadius: 40, // Make it circular
    marginRight: 15, // Add spacing between image and text
  },
  headerText: {
    fontSize: 24, // Larger font size for title
    fontWeight: 'bold',
    color: '#000',
    flex: 1, // Take up remaining space
    textAlign: 'center', // Align text to the left
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginBottom: 20,
  },
  modalScrollView: {
    height: 360,
    width: '100%',
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
