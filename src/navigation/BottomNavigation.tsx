
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native'; 
import AppointmentsScreen from '../screens/dashboard/Dashboard';
import PatientListScreen from '../screens/patientList/PatientList';
import ProfileScreen from '../screens/profile/Profile';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#FFFFFF', height: 86, paddingBottom: 10 },
        tabBarActiveTintColor: '#1EB6B9',
        tabBarInactiveTintColor: '#888888',
      
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case 'Appointments':
              iconSource = focused 
                ? require('../assets/images/AppointmentActive.png') 
                : require('../assets/images/Appointment.png'); 
              break;
            case 'PatientList':
              iconSource = focused 
                ? require('../assets/images/ListActive.png')
                : require('../assets/images/List.png');
              break;
            case 'Profile':
              iconSource = focused 
                ? require('../assets/images/ProfileActive.png')
                : require('../assets/images/Profile.png');
              break;
            default:
              iconSource = require('../assets/images/Appointment.png'); 
              break;
          }

          return <Image source={iconSource}  />;
        },
        tabBarLabel: ({ focused }) => {
          let label;

          switch (route.name) {
            case 'Appointments':
              label = focused ? 'Appointments' : 'Appointments';
              break;
            case 'PatientList':
              label = focused ? 'Patient List' : 'Patient List';
              break;
            case 'Profile':
              label = focused ? 'Profile' : 'Profile';
              break;
            default:
              label = '';
              break;
          }

          return <Text style={{ fontSize: 10, fontWeight:"400", color: focused ? '#1EB6B9' : '#888888' }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="PatientList" component={PatientListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  ); 
};

export default AppNavigator;

