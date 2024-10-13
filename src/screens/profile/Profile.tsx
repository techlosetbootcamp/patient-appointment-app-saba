import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const FETCH_MY_APPOINTMENTS = gql`
  query {
    fetchMyAppointments {
      id
      appointmentDate
      appointmentTime
      status
      doctor {
        id
        name
        profilePhoto
      }
    }
  }
`;

const ProfileScreen = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  // Fetch appointments (which includes doctor details)
  const { data, loading, error } = useQuery(FETCH_MY_APPOINTMENTS);

  // Extract the doctor's data (assuming the first appointment's doctor)
  const doctor = data?.fetchMyAppointments?.[0]?.doctor;

  // Toggle availability
  const toggleAvailability = () => setIsAvailable((previousState) => !previousState);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: doctor?.profilePhoto || 'https://via.placeholder.com/150' }} // Replace with doctor's actual photo
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{doctor?.name || 'Doctor Name'}</Text>
      </View>

      {/* Availability Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.sectionText}>Today's Availability</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isAvailable ? '#ffffff' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleAvailability}
            value={isAvailable}
          />
        </View>
      </View>

      {/* Upcoming Availability Section */}
      <TouchableOpacity style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.sectionText}>Upcoming Availability</Text>
          <Image
            source={require('../../assets/images/Right.png')} // Replace with actual right-arrow image
         
          />
        </View>
      </TouchableOpacity>

      {/* Logout Button */}



      <TouchableOpacity style={styles.section}>
        <View style={styles.row}>
        <Text style={styles.logoutText}>Logout</Text>
          <Image
            source={require('../../assets/images/Right.png')} // Replace with actual right-arrow image
        
          />
        </View>
      </TouchableOpacity>




    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#1EB6B9',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
    // borderWidth: 2,
    // borderColor: '#ffffff',
  },
  nameText: {
    marginTop: 7,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
  // iconImage: {
  //   width: 24,
  //   height: 24,
  // },
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6161',
    fontWeight: '400',
  },
});

export default ProfileScreen;
