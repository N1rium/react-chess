import React from 'react';
import styled from 'styled-components';

import { turnsFromPGN } from '../../../utils/chess-helper';

const PGNContainer = styled.main``;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
  &:nth-child(2n + 0) {
    background: rgba(0, 0, 0, 0.25);
  }
  & > * {
    flex: 0 0 50%;
    text-align: center;
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
            {turn.map((move, j) => (
              <Move key={j}>{move}</Move>
            ))}
          </Row>
        ))}
    </PGNContainer>
  );
};
