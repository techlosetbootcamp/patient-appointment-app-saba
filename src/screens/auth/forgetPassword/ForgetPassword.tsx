// ForgetPassword.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useMutation } from '@apollo/client';
import { FORGET_PASSWORD_MUTATION } from '../../../graphql/mutations/ForgetPassword';
import { useAppNavigation } from '../../../utils/AppNavigation';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [forgetPassword, { loading, error }] = useMutation(FORGET_PASSWORD_MUTATION);
  const navigation = useAppNavigation();
  const handleForgetPassword = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email address');
      return;
    }

    try {
      const response = await forgetPassword({ variables: { email } });
      if (response.data?.forgetPassword) {
        Alert.alert('Success', 'Password reset token has been sent to your email');
        navigation.navigate('ResetPassword');
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', 'Failed to send password reset link');
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
          <Text style={styles.header}>Forget Password</Text>
        </View>
        <Text style={styles.loginLink}>Enter your email address to receive a token for resetting your password.</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={styles.Button}
           onPress={handleForgetPassword}
          disabled={loading}
        >
           <Text style={styles.ButtonText}>{loading ? 'Sending...' : 'Sent'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginwithEmail')}>
          <Text style={styles.loginLink}>
            Already have an account?{' '}
            <Text style={styles.loginText}>Sign In</Text>
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

export default ForgetPassword;
