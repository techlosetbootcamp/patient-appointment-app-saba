import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import client from '../../apolloClient';
import {LOGIN_WITH_MOBILE} from '../../graphql/mutations/LoginwithMobile';
import {SIGNUP_USER} from '../../graphql/mutations/SignupUser';
import {VERIFY_OTP, RESEND_OTP} from '../../graphql/mutations/VerifyOtp';
import {jwtDecode} from 'jwt-decode';



interface JwtPayload {
  id: string;
  role: 'PATIENT' | 'DOCTOR';
  iat: number;
  exp: number;
}
interface AuthState {
  name: string;
  email: string;
  mobileNo: string;
  password: string;
  role: 'PATIENT' | 'DOCTOR';
  loading: boolean;
  error: string | null;
  success: boolean;
  otp: string[];
  resending: boolean;
  token: string | null;
}

const initialState: AuthState = {
  name: '',
  email: '',
  mobileNo: '+92',
  password: '',
  role: 'PATIENT',
  loading: false,
  error: null,
  success: false,
  otp: ['', '', '', '', ''],
  resending: false,
  token: null,
};

// Async action for sending OTP
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async ({mobileNo}: {mobileNo: string}, thunkAPI) => {
    try {
      const response = await client.mutate({
        mutation: LOGIN_WITH_MOBILE,
        variables: {mobileNo},
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Async action for signing up
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (
    userData: Omit<
      AuthState,
      'loading' | 'error' | 'success' | 'otp' | 'resending'
    >,
    {rejectWithValue},
  ) => {
    try {
      const {data} = await client.mutate({
        mutation: SIGNUP_USER,
        variables: userData,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'An error occurred during signup');
    }
  },
);



export const verifyOtpAction = createAsyncThunk(
  'auth/verifyOtp',
  async (
    { mobileNo, otp }: { mobileNo: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await client.mutate({
        mutation: VERIFY_OTP,
        variables: { mobileNo, otp },
      });

      // Ensure the response has the expected data structure
      const { loginWithMobile: token } = response.data;
      if (!token) {
        throw new Error('Invalid response data');
      }

      console.log('Received data from OTP verification:', token);

      // Decode the JWT token to get the role
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token);

      // Return the decoded information (token and role)
      return { token, role: decoded.role };
  
    } catch (error) {
      return rejectWithValue('Failed to verify OTP');
    }
  },
);


// Async action for resending OTP
export const resendOtpAction = createAsyncThunk(
  'auth/resendOtp',
  async (mobileNo: string, {rejectWithValue}) => {
    try {
      await client.mutate({
        mutation: RESEND_OTP,
        variables: {mobileNo},
      });
    } catch (error) {
      return rejectWithValue('Failed to resend OTP');
    }
  },
);

// Unified slice combining both Auth and OTP
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setMobileNo: (state, action: PayloadAction<string>) => {
      state.mobileNo = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRole: (state, action: PayloadAction<'PATIENT' | 'DOCTOR'>) => {
      state.role = action.payload;
      console.log('Role updated to:', action.payload);
    },
    setOtp: (state, action: PayloadAction<string[]>) => {
      state.otp = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Handle OTP Sending
      .addCase(sendOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle Signup
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle OTP Verification
      .addCase(verifyOtpAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.token = action.payload; 
        const { token, role } = action.payload; // Extract token and role from the payload
        state.token = token;
        state.role = role;
        console.log('Role set during OTP verification:', role);
     
      })
      .addCase(verifyOtpAction.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to verify OTP';
      })
      // Handle Resending OTP
      .addCase(resendOtpAction.pending, state => {
        state.resending = true;
      })
      .addCase(resendOtpAction.fulfilled, state => {
        state.resending = false;
      })
      .addCase(resendOtpAction.rejected, (state, action) => {
        state.resending = false;
        state.error = (action.payload as string) || 'Failed to resend OTP';
      });
  },
});

export const {setName, setEmail, setMobileNo, setPassword, setRole, setOtp} =
  authSlice.actions;
export default authSlice.reducer;
