import { gql } from '@apollo/client';

export const VERIFY_OTP = gql`
  mutation LoginWithMobile($mobileNo: String!, $otp: String!) {
    loginWithMobile(mobileNo: $mobileNo, otp: $otp)
  }
`;


export const RESEND_OTP = gql`
  mutation ResendOtp($mobileNo: String!) {
    resendOtp(mobileNo: $mobileNo)
  }
`;
