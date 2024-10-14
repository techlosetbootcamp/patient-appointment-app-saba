import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import {useAppNavigation} from '../../utils/AppNavigation';

const Splash = () => {
  const navigation = useAppNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnBoarding');
    },2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Logo.png')}
        style={styles.logo}
      />

      <Text style={styles.logoText}> Patient Diary</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EB6B9',
  
  },
  logo: {
    resizeMode: 'contain',
  },
  logoText: {
    marginTop: 20,
    fontSize: 33,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
export default Splash;
