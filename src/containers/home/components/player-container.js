import React from 'react';
import styled from 'styled-components';
import CapturedList from '../../../components/captured-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const PlayerContainer = styled.div`
  display: flex;
  color: #fff;
  margin: 0.5em 0;
  padding: 0px 32px;
  width: 100%;
  background: #383d59;
  border-radius: 10px;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const PlayerName = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;

const Caret = styled.div`
  position: absolute;
  left: 1em;
  animation: caret 1s ease-in-out infinite;
  will-change: transform;
  @keyframes caret {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default ({ moves, name, isBlack, turn }) => {
  const myTurn = (isBlack && turn === 'b') || (!isBlack && turn === 'w');
  return (
    <PlayerContainer>
      <Content>
        {myTurn && (
          <Caret>
            <FontAwesomeIcon icon={faCaretRight} />
          </Caret>
        )}
        <PlayerName>{name}</PlayerName>
        <CapturedList moves={moves} isBlack={isBlack} />
      </Content>
    </PlayerContainer>
  );
};
