import {gql} from '@apollo/client';

export const LOGIN_WITH_MOBILE = gql`
  mutation LoginWithMobile($mobileNo: String!) {
    loginWithMobile(mobileNo: $mobileNo)
  }
`;
