import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAppNavigation } from '../../utils/AppNavigation';

const PatientProfile = () => {
    const navigation = useAppNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/images/Back.png')} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.name}>Anupama Gurung</Text>
          <Text style={styles.phone}>📞 7500190739 | View Details</Text>
        </View>
        <Text style={styles.age}>32 yrs</Text>
      </View>

      {/* Appointments Section */}
      <View style={styles.appointmentsSection}>
        <Text style={styles.appointmentsTitle}>Appointments</Text>

        {/* Appointment Items */}
        {[
          { time: '04:00 PM', date: 'Tue, 12 Feb 2024', status: 'Upcoming', color: 'blue' },
          { time: '10:00 AM', date: 'Sat, 9 Feb 2024', status: 'Completed', color: 'green' },
          { time: '10:00 AM', date: 'Fri, 8 Feb 2024', status: 'Missed', color: 'red' },
        ].map((appointment, index) => (
          <View key={index} style={styles.appointmentItem}>
            <View style={styles.appointmentTime}>
              <Text style={[styles.time, { color: appointment.color }]}>{appointment.time}</Text>
              <Text style={styles.date}>{appointment.date}</Text>
            </View>
            <Text style={[styles.status, { color: appointment.color }]}>
              {appointment.status === 'Upcoming' ? '•' : `(${appointment.status})`}
            </Text>
            <TouchableOpacity>
              <Text style={styles.menuButton}>⋮</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() =>navigation.navigate("DoctorList") }>
          <Image source={require('../../assets/images/Search.png')}  />
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1EB6B9',
    padding: 16,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 20,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',

  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal:15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color:"#444444",
  },
  phone: {
    fontWeight: '400',
    fontSize: 14,
    color: '#1EB6B9',
    marginTop: 5,
  },
  age: {
    fontWeight: '400',
    fontSize: 14,
    color: '#666666',
  },
  appointmentsSection: {
    padding: 15,
  },
  appointmentsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#888888',
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  appointmentTime: {
    flex: 1,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  status: {
    fontSize: 14,
    marginLeft: 10,
  },
  menuButton: {
    fontSize: 20,
    color: '#999',
  },
});

export default PatientProfile;
