// mutations.js
import { gql } from '@apollo/client';

export const FORGET_PASSWORD_MUTATION = gql`
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;