import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieces from 'Components/chessboard/pieces';

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div``;
const Name = styled.div`
  font-weight: bold;
`;

const Captured = styled.div`
  display: flex;
  align-items: center;
  color: ${props => (props.white ? '#000' : '#fff')};
  font-size: 1.5em;
  svg {
    margin: 0px 2px;
  }
`;

export default ({ name, captured = [], side = 'w' }) => {
  return (
    <PlayerContainer>
      <UserInfo>
        <Name>{name}</Name>
      </UserInfo>
      <Captured white={side === 'w'}>
        {captured
          .filter(pawn => pawn.charAt(0) !== side)
          .map((pawn, i) => (
            <FontAwesomeIcon key={i} icon={pieces[pawn.charAt(1)]} />
          ))}
      </Captured>
    </PlayerContainer>
  );
};
