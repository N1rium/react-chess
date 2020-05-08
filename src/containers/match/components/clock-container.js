import React from 'react';
import styled from 'styled-components';
import Timer, { Time } from 'Components/timer';
import Flex from 'Components/styled/flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const ClockContainer = styled(Flex).attrs({ as: 'section', align: 'center' })`
  padding: 10px;
  font-size: 1.5rem;
`;

const TimerContainer = styled.div`
  height: 100%;
  margin-left: 10px;
`;

export default ({ match = {}, player = {} }) => {
  const { gameOver, turn } = match;
  const { side, pendingTimeoutDate, time } = player;

  return (
    <ClockContainer>
      <FontAwesomeIcon icon={faClock} />
      <TimerContainer>
        {!gameOver && side === turn ? (
          <Timer endDate={pendingTimeoutDate} format="{mm}:{ss}">
            {({ time }) => <div>{time}</div>}
          </Timer>
        ) : (
          <Time time={time}>{({ time }) => <div>{time}</div>}</Time>
        )}
      </TimerContainer>
    </ClockContainer>
  );
};
