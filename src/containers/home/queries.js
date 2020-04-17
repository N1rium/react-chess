import gql from 'graphql-tag';

export const GET_MATCHES = gql`
  query availableMatches {
    availableMatches {
      id
      participants {
        user {
          username
        }
      }
    }
  }
`;
