import React from 'react';
import styled from 'styled-components';

const Profile = styled.div``;
const Username = styled.div`
  font-weight: bold;
  font-size: 1.5em;
`;

const Info = styled.section`
  display: flex;
`;

const Stats = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Stat = styled.div`
  text-align: center;
`;

export default ({ user }) => {
  return (
    <Profile>
      <Info>
        <div>
          <Username>N1rium</Username>
          <div>1800</div>
        </div>
      </Info>
      <Stats>
        <Stat>
          <div>Matches played</div>
          <div>0</div>
        </Stat>
        <Stat>
          <div>Wins</div>
          <div>0</div>
        </Stat>
      </Stats>
    </Profile>
  );
};
