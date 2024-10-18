import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';
import SignUp from '../screens/auth/signUp/SignUp';
import Login from '../screens/auth/login/Login';
import OtpVerification from '../screens/auth/otpVerification/OtpVerification';
import SearchAppointment from '../screens/searchAppointment/SearchAppointment';
import PatientProfile from '../screens/patientProfile/PatientProfile';
import Splash from '../screens/splash/Splash';
import OnBoarding from '../screens/onboardingAppointment/OnboardingAppointment';
// import ScheduleAppointment from '../screens/scheduleAppointment/ScheduleAppointment';
import DoctorList from '../screens/doctorList/DoctorList';
import BottomNavigator from './BottomNavigation'; // For doctors (Dashboard)
import client from '../apolloClient';
import { RootStackParams } from '../types/types';
import { useAppSelector } from '../hooks/useDispatch';
import { RootState } from '../redux/store';
import LoginwithEmail from '../screens/auth/loginwithEmail/LoginwithEmail';
import ForgetPassword from '../screens/auth/forgetPassword/ForgetPassword';
import ResetPassword from '../screens/auth/resetPassword/ResetPassword';

export default function Navigation() {
  const Stack = createNativeStackNavigator<RootStackParams>();
  const { role, token } = useAppSelector((state: RootState) => state.auth);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Publicly accessible screens */}
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="LoginwithEmail" component={LoginwithEmail} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="OtpVerification" component={OtpVerification} />

          {/* Conditionally accessible screens based on role */}
          {role === 'DOCTOR' && (
            <>
            <Stack.Screen name="Dashboard" component={BottomNavigator} />
            <Stack.Screen name="SearchAppointment" component={SearchAppointment} />
            
              
            </>
          )}

          {role === 'PATIENT' && (
            <>
              <Stack.Screen name="PatientProfile" component={PatientProfile} />
              <Stack.Screen name="DoctorList" component={DoctorList} />
              {/* <Stack.Screen name="ScheduleAppointment" component={ScheduleAppointment} /> */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
