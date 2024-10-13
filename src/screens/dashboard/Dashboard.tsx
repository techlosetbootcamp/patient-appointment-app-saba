import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { useAppNavigation } from '../../utils/AppNavigation';

const GET_DOCTOR_APPOINTMENTS = gql`
  query GetDoctorAppointments($status: String!) {
    getPatientsByDoctor(status: $status) {
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

const AppointmentsScreen: React.FC = () => {
  const [filter, setFilter] = useState<'UPCOMING' | 'MISSED' | 'COMPLETED'>('UPCOMING');
  const navigation = useAppNavigation();
  const { loading, error, data } = useQuery<GetPatientsByDoctorResponse>(GET_DOCTOR_APPOINTMENTS, {
    variables: { status: filter },
    // fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;

  if (!data || !data.getPatientsByDoctor || data.getPatientsByDoctor.length === 0) {
    return <Text>No appointments found.</Text>;
  }
  if (error) return <Text>Error: {error.message}</Text>;
  const appointments = data.getPatientsByDoctor.map((patient) => {
    return patient.appointments
      .filter((appointment) => appointment.status === filter)
      .map((appointment) => ({
        id: `${patient.id}-${appointment.id}`, 
        name: patient.name,
        age: `${patient.age} years`,
        time: appointment.appointmentTime,
        status: appointment.status,
        image: patient.photo ? { uri: patient.photo } : require('../../assets/images/google.png'),
      }));
  }).flat();

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




      <TouchableOpacity
  onPress={() => {
    console.log("Navigating to PatientProfile");
    navigation.navigate("PatientProfile");
  }}
>




        <Image source={require('../../assets/images/Dots.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
       
          <Text style={styles.header}>Appointments</Text>

        <TouchableOpacity onPress={() =>navigation.navigate("SearchAppointment") }>
          <Image source={require('../../assets/images/Search.png')}  />
        </TouchableOpacity>
      </View>


      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('UPCOMING')} style={[styles.filterButton, filter === 'UPCOMING' && styles.activeFilter]}>
          <Text style={styles.filterText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('MISSED')} style={[styles.filterButton, filter === 'MISSED' && styles.activeFilter]}>
          <Text style={styles.filterText}>Missed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('COMPLETED')} style={[styles.filterButton, filter === 'COMPLETED' && styles.activeFilter]}>
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.todayContainer}>
        <Text style={styles.todayText}>Today</Text>
      </View>

      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ flexShrink: 0, flexGrow: 0 }}
      />

      <TouchableOpacity style={styles.viewPastButton}>
        <Text style={styles.viewPastText}>View past appointments {">"}</Text>
      </TouchableOpacity>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    backgroundColor: '#1EB6B9',
    color: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1EB6B9',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  filterButton: {
    padding: 10,
  },
  activeFilter: {
    borderBottomWidth: 3,
    borderBottomColor: '#1EB6B9',
  },
  filterText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
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


  // statusContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
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

  // more: {
  //   fontSize: 24,
  //   color: '#00BFFF',
  // },
  addButtonContainer: {
    alignItems: 'flex-end',
    padding: 20,
  },
  addButton: {
    width: 54,
    height: 54,
    borderRadius: 30,
    backgroundColor: '#1EB6B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  viewPastButton: {
    alignItems: 'center',
    padding: 10,
  },
  viewPastText: {
    color: '#1EB6B9',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default AppointmentsScreen;
