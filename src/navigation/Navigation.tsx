
// Navigation.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';
import SignUp from '../screens/signUp/SignUp';
import Login from '../screens/login/Login';
import OtpVerification from '../screens/otpVerification/OtpVerification';
import SearchAppointment from "../screens/searchAppointment/SearchAppointment"
// import PatientProfile from "../screens/patientProfile/PatientProfile"
// import Splash from "../screens/splash/Splash"
// import OnBoarding from "../screens/onboardingAppointment/OnboardingAppointment"
import AppNavigator from './BottomNavigation'; 
import client from '../apolloClient';
import { RootStackParams } from '../types/types';

export default function Navigation() {
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} /> */}
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OtpVerification" component={OtpVerification} />
          <Stack.Screen name="Dashboard" component={AppNavigator} />
        <Stack.Screen name="SearchAppointment" component={SearchAppointment} />
          {/* <Stack.Screen name="PatientProfile" component={PatientProfile} />  */}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
