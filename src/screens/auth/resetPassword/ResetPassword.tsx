// ResetPassword.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD_MUTATION } from '../../../graphql/mutations/ForgetPassword';
import { useAppNavigation } from '../../../utils/AppNavigation';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD_MUTATION);
  const navigation = useAppNavigation();

  const handleResetPassword = async () => {
    if (!token || !newPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await resetPassword({ variables: { token, newPassword } });
      if (response.data?.resetPassword) {
        Alert.alert('Success', 'Password has been reset successfully');
        navigation.navigate('LoginwithEmail');
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', 'Failed to reset password');
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
        <Text style={styles.header}>Reset Password</Text>
      </View>



      <Text style={styles.label}>Token</Text>
      <TextInput
          style={styles.input}
      placeholder="Enter reset token"
      value={token}
      onChangeText={setToken}
      autoCapitalize="none"
      autoCorrect={false}
      />



<TextInput
      style={styles.input}
      placeholder="Enter new password"
      value={newPassword}
      onChangeText={setNewPassword}
      secureTextEntry
      autoCapitalize="none"
      autoCorrect={false}
    />


      <TouchableOpacity
        style={styles.Button}
     onPress={handleResetPassword}
        disabled={loading}
      >
                <Text style={styles.ButtonText}>{loading ? 'Resetting...' : 'Reset Password'}</Text>
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

export default ResetPassword;
