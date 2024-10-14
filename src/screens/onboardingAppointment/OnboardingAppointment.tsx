import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useAppNavigation} from '../../utils/AppNavigation';

const onboardingData = [
  {
    image: require('../../assets/images/Onboard1.png'),
    title: 'Never miss an appointment!',
    subtitle: 'App will let you know about all upcoming appointments on time.',
  },
  {
    image: require('../../assets/images/Onboard2.png'),
    title: 'Stay Organized',
    subtitle:
      'Keep track of all your important tasks and appointments effortlessly.',
  },
  {
    image: require('../../assets/images/Onboard3.png'),
    title: 'Get Notified',
    subtitle: 'Receive notifications to stay updated on the go.',
  },
];

const BoardingScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useAppNavigation();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('SignUp');
    }
  };

  const handleSkip = () => {
    navigation.navigate('SignUp');
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  const {image, title, subtitle} = onboardingData[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {/* Render dots here */}
        {renderDots()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex === onboardingData.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#1EB6B9',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    // overflow: 'hidden',
  },
  image: {
    marginTop: '25%',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
    color: '#222222',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: '15%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15%',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#1EB6B9',
  },
  inactiveDot: {
    backgroundColor: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  skipButton: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    alignItems: 'center',
    padding: 15,
  },
  skipButtonText: {
    color: '#1EB6B9',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#1EB6B9',
    borderRadius: 8,
    alignItems: 'center',
    padding: 15,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BoardingScreen;
