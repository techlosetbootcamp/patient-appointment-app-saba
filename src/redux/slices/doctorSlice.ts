// doctorSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import client from '../../apolloClient';
import { gql } from '@apollo/client';

// Define the GraphQL query
const GET_ALL_DOCTORS = gql`
  query GetAllDoctors {
    getAllDoctors {
      id
      name
      profilePhoto
      gender
    }
  }
`;

// Define the type for a doctor
type Doctor = {
  id: string;
  name: string;
  profilePhoto: string;
  gender: string;
};

// Async thunk to fetch doctors
export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await client.query({
    query: GET_ALL_DOCTORS,
  });
  return response.data.getAllDoctors as Doctor[];
});

// Define the initial state
type DoctorsState = {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  selectedDoctorId: string | null;
};

const initialState: DoctorsState = {
  doctors: [],
  loading: false,
  error: null,
  selectedDoctorId: null,
};

// Create the slice
const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setSelectedDoctorId: (state, action: PayloadAction<string | null>) => {
      state.selectedDoctorId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch doctors';
      });
  },
});

// Export the action to set the selected doctor ID
export const { setSelectedDoctorId } = doctorSlice.actions;

// Export the reducer
export default doctorSlice.reducer;
