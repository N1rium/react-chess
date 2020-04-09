import React from 'react';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div``;
const Name = styled.div`
  font-weight: bold;
`;

export default ({ name }) => {
  return (
    <PlayerContainer>
      <UserInfo>
        <Name>{name}</Name>
      </UserInfo>
    </PlayerContainer>
  );
};
