import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieces from 'Components/chessboard/pieces';
import Timer, { Time } from '../../../components/timer';

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
  color: ${(props) => (props.side === 'w' ? '#000' : '#fff')};
  font-size: 1.5rem;
  svg {
    margin: 0px 2px;
  }
`;

export default ({ player, turn, captured = [] }) => {
  const { user: { username = 'Empty slot' } = {}, side, pendingTimeoutDate, time } = player || {};

  return (
    <PlayerContainer>
      <UserInfo>
        <Name>{username}</Name>
        {side === turn && (
          <Timer endDate={pendingTimeoutDate} format="{mm}:{ss}">
            {({ time }) => <div>{time}</div>}
          </Timer>
        )}
        {side !== turn && <Time time={time}>{({ time }) => <div>{time}</div>}</Time>}
      </UserInfo>
      <Captured side={side}>
        {captured
          .filter((pawn) => pawn.charAt(0) !== side)
          .map((pawn, i) => (
            <FontAwesomeIcon key={i} icon={pieces[pawn.charAt(1)]} />
          ))}
      </Captured>
    </PlayerContainer>
  );
};
