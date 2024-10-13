import {gql} from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation Signup(
    $name: String!
    $email: String!
    $mobileNo: String!
    $password: String!
    $role: String
  ) {
    signup(
      name: $name
      email: $email
      mobileNo: $mobileNo
      password: $password
      role: $role
    )
  }
`;
