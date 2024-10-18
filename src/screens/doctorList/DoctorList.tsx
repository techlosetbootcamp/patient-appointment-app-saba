// DoctorList.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchDoctors, setSelectedDoctorId } from '../../redux/slices/doctorSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppNavigation } from '../../utils/AppNavigation';

const DoctorList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const { doctors, loading, error } = useSelector((state: RootState) => state.doctors);

  type Doctor = {
    id: string;
    name: string;
    profilePhoto: string;
    gender: string;
  };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const handleDoctorClick = (id: string) => {
    dispatch(setSelectedDoctorId(id));
    navigation.navigate('ScheduleAppointment');
  };

  const renderItem = ({ item }: { item: Doctor }) => (
    <TouchableOpacity onPress={() => handleDoctorClick(item.id)} style={styles.itemContainer}>
      <Image source={{ uri: item.profilePhoto }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>Gender: {item.gender}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={doctors}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#777',
  },
  moreIcon: {
    padding: 8,
  },
});

export default DoctorList;


// import { View, Text } from 'react-native'
// import React from 'react'

// export default function DoctorList() {
//   return (
//     <View>
//       <Text>DoctorList</Text>
//     </View>
//   )
// }