import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieceMap from '../pieces';

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
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      position: absolute;
    }
  }
  &.active {
    .pawn {
      transform: scale(1.25);
      opacity: 0.8;
    }
  }
`;

const Pawn = styled.div.attrs({ className: 'pawn' })`
  color: ${props => (props.isBlack ? '#000' : '#fff')};
`;

export default ({ cell, moveStart, square, onClick, onDrop, onDragStart }) => {
  return (
    <Cell
      id={square}
      className={`${square == moveStart ? 'active' : ''}`}
      isBlack={cell && cell.color === 'b'}
      onClick={onClick}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
    >
      {cell && (
        <Pawn isBlack={cell.color == 'b'} draggable="true" onDragStart={onDragStart}>
          <FontAwesomeIcon icon={pieceMap[cell.type]} />
        </Pawn>
      )}
    </Cell>
  );
};
