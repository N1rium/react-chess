import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieces from 'Components/chessboard/pieces';
import Flex from 'Components/styled/flex';
import Timer, { Time } from '../../../components/timer';

const UserInfo = styled.div``;
const Name = styled.div`
  font-weight: bold;
`;

const Captured = styled(Flex)`
  color: ${(props) => (props.side === 'w' ? '#000' : '#fff')};
  font-size: 1.5rem;
  svg {
    margin: 0px 2px;
  }
`;

const Section = styled(Flex).attrs({ as: 'section', align: 'center' })`
  padding: 10px;
  min-height: 48px;
`;

const TimerContainer = styled.div`
  height: 100%;
`;

export default ({ player, turn, captured = [], gameOver }) => {
  const { user: { username = 'Empty slot' } = {}, side, pendingTimeoutDate, time } = player || {};

  return (
    <Section align="center" justify="space-between">
      <UserInfo>
        <Name>{username}</Name>
      </UserInfo>
      <TimerContainer>
        {!gameOver && side === turn ? (
          <Timer endDate={pendingTimeoutDate} format="{mm}:{ss}">
            {({ time }) => <div>{time}</div>}
          </Timer>
        ) : (
          <Time time={time}>{({ time }) => <div>{time}</div>}</Time>
        )}
      </TimerContainer>
      {/* <Captured align="center" side={side}>
        {captured
          .filter((pawn) => pawn.charAt(0) !== side)
          .map((pawn, i) => (
            <FontAwesomeIcon key={i} icon={pieces[pawn.charAt(1)]} />
          ))}
      </Captured> */}
    </Section>
  );
};
