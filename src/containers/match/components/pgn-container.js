import React from 'react';
import styled from 'styled-components';

import { turnsFromPGN } from '../../../utils/chess-helper';

const PGNContainer = styled.main``;

const Turn = styled.span``;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
  &:nth-child(2n + 0) {
    background: rgba(0, 0, 0, 0.25);
  }
  & > * {
    flex: 0 0 40%;
    text-align: center;
  }

  & > :first-child {
    flex: 0 0 20%;
  }
`;

const Move = styled.span.attrs({ className: 'hover-btn' })``;

export default ({ pgn = null }) => {
  const turns = turnsFromPGN({ pgn });
  return (
    <PGNContainer>
      {turns.length > 0 &&
        turns.map((turn, i) => (
          <Row key={i}>
            <Turn>{i + 1}</Turn>
            {turn.map((move, j) => (
              <Move key={j}>{move}</Move>
            ))}
          </Row>
        ))}
    </PGNContainer>
  );
};
