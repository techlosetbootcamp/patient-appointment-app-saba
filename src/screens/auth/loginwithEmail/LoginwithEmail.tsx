// LoginWithEmail.tsx
import React, { useState } from 'react';
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
import { useMutation } from '@apollo/client';
import { LOGIN_WITH_EMAIL_MUTATION } from '../../../graphql/mutations/LoginwithEmail';
import { useAppNavigation } from '../../../utils/AppNavigation';

const LoginWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginWithEmail, { loading, error }] = useMutation(LOGIN_WITH_EMAIL_MUTATION);
  const navigation = useAppNavigation();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill all fields');
      return;
    }

    try {
      const response = await loginWithEmail({ variables: { email, password } });
      if (response.data?.loginWithEmail) {
        Alert.alert('Login Successful!', 'You have been logged in successfully');
        navigation.navigate('Dashboard'); // Navigate to the home screen or any other screen
      }
    } catch (err:any) {
      Alert.alert('Login Failed', err.message || 'Something went wrong');
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
          <Text style={styles.header}>Sign In</Text>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

      
        <TouchableOpacity
          style={styles.Button}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.ButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.loginLink}>Forgot Password?</Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.loginLink}>
          Don't have an account?{' '}
            <Text style={styles.loginText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
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

export default LoginWithEmail;
