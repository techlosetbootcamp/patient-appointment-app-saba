import React from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {useAppNavigation} from '../../utils/AppNavigation';

const RequestOtp = () => {
  const {handleSendOtp, loading, error, handleSetMobileNo, mobileNo} =
    useAuth();
  const navigation = useAppNavigation();

  const onSubmit = async () => {
    try {
      await handleSendOtp(mobileNo);
      Alert.alert('OTP Sent!', `An OTP has been sent to ${mobileNo}`);
      navigation.navigate('OtpVerification');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Arrow.png')}
            style={styles.arrowImage}
          />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign in</Text>
        </View>

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.mobileInputContainer}>
          <Text style={styles.countryCode}>+92</Text>
          <TextInput
            style={styles.mobileInput}
            placeholder="Enter your mobile number"
            value={mobileNo.substring(3)}
            onChangeText={text => handleSetMobileNo(`+92${text}`)}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={styles.Button}
          onPress={onSubmit}
          disabled={loading}>
          <Text style={styles.ButtonText}>
            {loading ? 'Sending OTP...' : 'Continue'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <View style={styles.googleButtonContent}>
            <Image
              source={require('../../assets/images/google.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing you agree to our{' '}
          <Text style={styles.linkText}>Terms of service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  arrowImage: {
    marginBottom: '8%',
  },

  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
  },
  label: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
    color: '#1EB6B9',
  },
  mobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  countryCode: {
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: '500',
    color: '#666666',
  },
  mobileInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  Button: {
    backgroundColor: '#1EB6B9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  ButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 25,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  googleButtonText: {
    color: '#666666',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },

  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  googleIcon: {
    marginRight: 10, // Adds space between icon and text
  },
  termsText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#888888',
  },
  linkText: {
    color: '#666666',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default RequestOtp;
