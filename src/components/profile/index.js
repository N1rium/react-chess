import React from 'react';
import styled from 'styled-components';

const Profile = styled.div``;
const Username = styled.div`
  font-weight: bold;
  font-size: 1.5em;
`;

const Info = styled.div`
  display: flex;
`;

export default ({ user }) => {
  return (
    <Profile>
      <Info>
        <div>
          <Username>N1rium</Username>
        </div>
      </Info>
    </Profile>
  );
};
