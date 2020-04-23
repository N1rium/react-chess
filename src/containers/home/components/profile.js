import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const ME = gql`
  query me {
    me {
      username
    }
  }
`;

const Profile = styled.section`
  grid-area: profile;
`;

export default ({}) => {
  const { data, loading } = useQuery(ME);

  return (
    <Profile>
      <header>
        {loading && <div>Loading...</div>}
        <div>{!loading && data && data.me.username}</div>
      </header>
    </Profile>
  );
};
