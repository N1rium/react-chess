import React from 'react';
import styled from 'styled-components';

const Profile = styled.div``;
const Username = styled.div`
  font-weight: bold;
  font-size: 1.5em;
`;
const ProfilePicture = styled.img.attrs({
  src: 'https://i.pinimg.com/originals/89/17/b2/8917b2866bf5d050251d3d791f6b3307.png',
})`
  width: 64px;
  height: 64px;
  object-fit: cover;
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
        <ProfilePicture />
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
