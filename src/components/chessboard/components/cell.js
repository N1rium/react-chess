import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieceMap from '../pieces';
import Pawn from 'Components/styled/pawn';

const Cell = styled.div.attrs({ className: 'cell' })`
  width: ${props => `${props.theme.unitSize}px`};
  height: ${props => `${props.theme.unitSize}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  &.highlighted {
    &:after {
      content: '';
      width: 12px;
      height: 12px;
      background: #fbf076;
      border-radius: 50%;
      position: absolute;
    }
  }
`;

export default ({ cell, moveStart, square, onClick, onDrop, onDragStart }) => {
  return (
    <Cell
      id={square}
      isBlack={cell && cell.color === 'b'}
      onClick={onClick}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
    >
      {cell && (
        <Pawn
          isBlack={cell.color == 'b'}
          active={square == moveStart}
          draggable="true"
          onDragStart={onDragStart}
          onDrop={onDrop}
        >
          <FontAwesomeIcon icon={pieceMap[cell.type]} />
        </Pawn>
      )}
    </Cell>
  );
};
