// mutations.js
import { gql } from '@apollo/client';

export const LOGIN_WITH_EMAIL_MUTATION = gql`
  mutation LoginWithEmail($email: String!, $password: String!) {
    loginWithEmail(email: $email, password: $password)
  }
`;
