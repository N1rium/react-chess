import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieceMap from '../../pieces';

const CapturedList = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  width: 100%;
  min-height: 38px;
  font-size: 1.5em;
  margin-left: 0.5em;
`;

const Piece = styled.div`
  color: ${props => (props.isBlack ? '#000' : '#fff')};
  margin: 0 0.1em;
`;

export default ({ moves, isBlack = false }) => {
  const color = isBlack ? 'b' : 'w';
  const list = moves.filter(move => move.color === color && move.captured) || [];
  return (
    <CapturedList>
      {list.map((piece, i) => (
        <Piece key={i} isBlack={piece.color === 'w'}>
          <FontAwesomeIcon icon={pieceMap[piece.captured]} />
        </Piece>
      ))}
    </CapturedList>
  );
};
