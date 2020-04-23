import gql from 'graphql-tag';

export const CREATE_MATCH = gql`
  mutation createMatch($input: CreateMatchInput!) {
    createMatch(input: $input) {
      id
    }
  }
`;

export const CREATE_MATCH_INVITE = gql`
  mutation createMatchInvite {
    createMatchInvite {
      id
      createdDate
      creator {
        id
        username
      }
    }
  }
`;

export const GET_MATCH_INVITES = gql`
  query matchInvites {
    matchInvites {
      id
      createdDate
      creator {
        id
        username
      }
    }
  }
`;

export const MATCH_INVITE_SUBSCRIPTION = gql`
  subscription matchInvite {
    matchInvite {
      deleted
      invite {
        id
        createdDate
        creator {
          id
          username
        }
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      id
    }
  }
`;

export const DELETE_MATCH_INVITE = gql`
  mutation deleteMyInvite {
    deleteMyInvite {
      id
    }
  }
`;
