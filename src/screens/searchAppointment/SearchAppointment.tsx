import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useAppNavigation } from '../../utils/AppNavigation';

const GET_DOCTOR_APPOINTMENTS = gql`
  query GetDoctorAppointments {
    getPatientsByDoctor {
      id
      name
      age
      photo
      appointments {
        id
        status
        appointmentTime
      }
    }
  }
`;

interface Appointment {
  id: string;
  status: string;
  appointmentTime: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  photo: string | null;
  appointments: Appointment[];
}

interface GetPatientsByDoctorResponse {
  getPatientsByDoctor: Patient[];
}

const SearchAppointment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useAppNavigation();
  const { loading, error, data } = useQuery<GetPatientsByDoctorResponse>(GET_DOCTOR_APPOINTMENTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  if (!data || !data.getPatientsByDoctor || data.getPatientsByDoctor.length === 0) {
    return <Text>No appointments found.</Text>;
  }

  const appointments = data.getPatientsByDoctor.flatMap((patient) => {
    return patient.appointments.map((appointment) => ({
      id: `${patient.id}-${appointment.id}`,
      name: patient.name,
      age: `${patient.age} years`,
      time: appointment.appointmentTime,
      status: appointment.status,
      image: patient.photo ? { uri: patient.photo } : require('../../assets/images/google.png'),
    }));
  });

  // Filter appointments based on search term
  const filteredAppointments = searchTerm
    ? appointments.filter((appointment) =>
        appointment.status.toLowerCase() === searchTerm.toLowerCase()
      )
    : appointments;

  const getDotColor = (status: string) => {
    switch (status) {
      case 'UPCOMING':
        return '#1EB6B9';
      case 'MISSED':
        return '#FF6161';
      case 'COMPLETED':
        return '#42CD69';
      default:
        return '#888888';
    }
  };

  const renderItem = ({ item }: { item: typeof appointments[0] }) => (
    <View style={styles.appointmentItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{item.age} | {item.time}</Text>
          <View style={[styles.statusDot, { backgroundColor: getDotColor(item.status) }]} />
        </View>
      </View>

      <TouchableOpacity>
        <Image source={require('../../assets/images/Dots.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/images/Back.png')} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Appointments"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Image source={require('../../assets/images/ActiveSearch.png')} style={styles.searchIcon} />
        </View>
      </View>

      <View style={styles.todayContainer}>
        <Text style={styles.todayText}>Results</Text>
      </View>

      <FlatList
        data={filteredAppointments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexShrink: 0, flexGrow: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#1EB6B9',
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    position: 'relative', 
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 40, 
    paddingVertical:10,
    fontSize: 14,
  },
  searchIcon: {
    position: 'absolute',
    right: 10, 
    top: 10, 
    width: 20, 
    height: 20, 
  },
  todayContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    alignItems: 'center',
  },
  todayText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '400',
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 25,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444444',
  },
  info: {
    color: '#666',
    fontSize: 14,
    fontWeight: '400',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 67,
    marginLeft: 5,
  },
  infoContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center align vertically
  },
});

export default SearchAppointment;
