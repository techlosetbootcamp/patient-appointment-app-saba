import React, {useEffect} from 'react';
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
import {useAuth} from '../../../hooks/useAuth';
import {useAppNavigation} from '../../../utils/AppNavigation';

const SignUp = () => {
  const {
    name,
    email,
    mobileNo,
    password,
    role,
    loading,
    error,
    success,
    handleSetName,
    handleSetEmail,
    handleSetMobileNo,
    handleSetPassword,
    handleSetRole,
    handleSignup,
  } = useAuth();
  const navigation = useAppNavigation();

  const handleSubmit = async () => {
    if (!name || !email || !mobileNo || !password) {
      Alert.alert('Missing Fields', 'Please fill all fields');
      return;
    }

    try {
      await handleSignup();
      navigation.navigate('Login');
      Alert.alert('Signup Successful!', `Welcome, ${name}`);
    } catch (err: any) {
      Alert.alert('Signup Failed', err.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/Arrow.png')}
            style={styles.arrowImage}
          />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign up</Text>
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={handleSetName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={handleSetEmail}
          keyboardType="email-address"
        />

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

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={handleSetPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Role</Text>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'PATIENT' && styles.selectedRoleButton,
            ]}
            onPress={() => handleSetRole('PATIENT')}>
            <Text
              style={[
                styles.roleButtonText,
                role === 'PATIENT' && styles.selectedRoleButtonText,
              ]}>
              Patient
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'DOCTOR' && styles.selectedRoleButton,
            ]}
            onPress={() => handleSetRole('DOCTOR')}>
            <Text
              style={[
                styles.roleButtonText,
                role === 'DOCTOR' && styles.selectedRoleButtonText,
              ]}>
              Doctor
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.Button}
          onPress={handleSubmit}
          disabled={loading}>
          <Text style={styles.ButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>
            Already have an account?{' '}
            <Text style={styles.loginText}>Sign In</Text>
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}
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
    backgroundColor: '#ffffff',
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
  input: {
    height: 48,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F2F2F2',
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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderColor: '#1EB6B9',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  selectedRoleButton: {
    backgroundColor: '#1EB6B9',
  },
  roleButtonText: {
    color: '#1EB6B9',
    fontSize: 16,
  },
  selectedRoleButtonText: {
    color: '#ffffff',
  },
  Button: {
    backgroundColor: '#1EB6B9',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  ButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },

  loginLink: {
    color: '#888888', 
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  loginText: {
    color: '#1EB6B9', 
    fontWeight: 'bold',
  },
});

export default SignUp;
