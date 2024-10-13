import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

import {useAuth} from '../../hooks/useAuth';
import {useAppNavigation} from '../../utils/AppNavigation';

const OtpVerificationScreen = () => {
  const navigation = useAppNavigation();

  const {
    otp,
    mobileNo,
    loading,
    resending,
    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
    error,
  } = useAuth();

  const onSubmit = async () => {
    const otpString = otp.join('');

    try {
      await handleVerifyOtp(mobileNo, otpString);
      console.log('OTP submitted successfully');
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error submitting OTP:', error);
    }
  };

  const onResendOtp = async () => {
    try {
      await handleResendOtp(mobileNo);
      console.log('OTP resent successfully');
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/Arrow.png')} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.header}>Verify Phone No</Text>
          <Text style={styles.subtitle}>Enter the OTP</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit: string, index: number) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={value => handleOtpChange(index, value)}
                style={styles.otpBox}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>

          {/* Centered buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.fullWidthButton]}
              onPress={onSubmit}
              disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? 'Validating...' : 'Validate OTP'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendContainer}
              onPress={onResendOtp}
              disabled={resending}>
              <Text style={styles.resendText}>Didn’t receive the OTP? </Text>
              <Text style={[styles.resendText, styles.resendLink]}>
                {resending ? 'Resending...' : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  content: {
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    textAlign: 'left',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 10,
    color: '#1EB6B9',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpBox: {
    width: 58,
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1EB6B9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  fullWidthButton: {
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#888',
  },
  resendLink: {
    color: '#5FC8B2',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default OtpVerificationScreen;
