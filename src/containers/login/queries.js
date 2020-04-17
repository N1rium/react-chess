import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      token
    }
  }
`;
