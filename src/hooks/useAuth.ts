

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
    dispatch(verifyOtpAction({mobileNo, otp: otpString}));
  };

  const handleResendOtp = async (mobileNo: string) => {
    dispatch(resendOtpAction(mobileNo));
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
  };
};
