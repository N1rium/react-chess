import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const ME = gql`
  query me {
    me {
      id
      username
      blitzElo
      bulletElo
      classicalElo
      rapidElo
    }
  }
`;

const Profile = styled.section`
  grid-area: profile;
`;

export default ({}) => {
  const { data, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network' });

  return (
    <Profile>
      <header>
        {loading && <div>Loading...</div>}
        <div>{!loading && data && data.me.username}</div>
      </header>
      {!loading && data && (
        <main>
          <div>
            <span>Bullet: {data.me.bulletElo}</span>
          </div>
          <div>
            <span>Blitz: {data.me.blitzElo}</span>
          </div>
          <div>
            <span>Rapid: {data.me.rapidElo}</span>
          </div>
          <div>
            <span>Classical: {data.me.classicalElo}</span>
          </div>
        </main>
      )}
    </Profile>
  );
};
