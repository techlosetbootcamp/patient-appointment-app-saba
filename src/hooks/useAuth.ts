import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  setName,
  setEmail,
  setMobileNo,
  setPassword,
  setRole,
  signupUser,
  sendOtp,
  verifyOtpAction,
  resendOtpAction,
  setOtp,
} from '../redux/slices/authSlice';
import {useAppDispatch} from './useDispatch';
import {useAppNavigation} from '../utils/AppNavigation';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const {
    name,
    email,
    mobileNo,
    password,
    role,
    otp,
    loading: otpLoading,
    resending,
    error: otpError,
    loading: authLoading,
    error: authError,
    success,
   
  } = useSelector((state: RootState) => state.auth);
  const navigation = useAppNavigation();

  console.log('Current role in useAuth:', role);
  // Auth state setters
  const handleSetName = (name: string) => dispatch(setName(name));
  const handleSetEmail = (email: string) => dispatch(setEmail(email));
  const handleSetMobileNo = (mobileNo: string) =>
    dispatch(setMobileNo(mobileNo));
  const handleSetPassword = (password: string) =>
    dispatch(setPassword(password));
  const handleSetRole = (role: 'PATIENT' | 'DOCTOR') => dispatch(setRole(role));

  // Auth action handlers
  const handleSignup = () =>
    dispatch(signupUser({
      name, email, mobileNo, password, role,
      token: null
    }));

  const handleSendOtp = (mobileNo: string) => {
    if (!mobileNo) {
      throw new Error('Invalid Mobile Number');
    }
    dispatch(sendOtp({mobileNo}));
  };

  // OTP action handlers
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      dispatch(setOtp(newOtp));
    }
  };

  const handleVerifyOtp = async (mobileNo: string, otpString: string) => {
  await dispatch(verifyOtpAction({mobileNo, otp: otpString}));
  };

  const handleResendOtp = async (mobileNo: string) => {
    dispatch(resendOtpAction(mobileNo));
  };


  const onSubmitOtp =  () => {
    const otpString = otp.join('');
    if (!mobileNo) throw new Error('Mobile number is required');
    try {
    handleVerifyOtp(mobileNo, otpString);
      console.log('OTP submitted successfully',role);
      const updatedRole = role; // This will reflect the updated role after the verification

      // Check the role and navigate to the appropriate screen
      if (updatedRole === 'PATIENT') {
        navigation.navigate('PatientProfile'); // Navigate to PatientProfile if role is PATIENT
      } else if (updatedRole === 'DOCTOR') {
        navigation.navigate('Dashboard'); // Navigate to Dashboard if role is DOCTOR
      }
  console.log("updated role" ,role)
    } catch (error) {
      console.error('Error submitting OTP:', error);
    }
  };

  // Moved onResendOtp logic to useAuth
  const onResendOtp = async () => {
    try {
      await handleResendOtp(mobileNo);
      console.log('OTP resent successfully');
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };


  return {
    // Auth state and handlers
    name,
    email,
    mobileNo,
    password,
    role,
    loading: authLoading,
    error: authError,
    success,
    handleSetName,
    handleSetEmail,
    handleSetMobileNo,
    handleSetPassword,
    handleSetRole,
    handleSignup,
    handleSendOtp,

    // OTP state and handlers
    otp,
    otpLoading,
    resending,
    otpError,

    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,

    onSubmitOtp,
    onResendOtp,
  };
};
