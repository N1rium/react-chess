import React from 'react';
import styled from 'styled-components';
import { wikipedia } from '../pieces';
import Pawn from 'Components/styled/pawn';

const Cell = styled.div.attrs(props => ({
  className: `cell ${props.highlight ? 'highlighted' : ''} ${props.grabbable ? 'grabbable' : ''}`,
}))`
  position: relative;
  width: 12.5%;
  height: 100%;
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
      pointer-events: none;
    }
  }
  &.grabbable {
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
`;

const Index = styled.div`
  position: absolute;
  font-size: 0.33em;
  font-weight: bold;
  visibility: hidden;
  user-select: none;
`;

const Number = styled(Index).attrs({ className: 'index cell-number' })`
  top: 2px;
  right: 2px;
`;

const Letter = styled(Index).attrs({ className: 'index cell-letter' })`
  bottom: 2px;
  left: 2px;
`;

export default ({ cell, moveStart, square, onClick, onDrop, onDragStart, highlight, showIndexes = true }) => {
  return (
    <Cell
      id={square}
      highlight={highlight}
      grabbable={cell && cell.color}
      isBlack={cell && cell.color === 'b'}
      onClick={onClick}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
      draggable="true"
      onDragStart={e => {
        const img = new Image();
        img.src = wikipedia[`${cell.color}${cell.type}`];
        e.dataTransfer.setDragImage(img, 22.5, 22.5);
        onDragStart(e);
      }}
      onDrop={onDrop}
    >
      {cell && (
        <Pawn isBlack={cell.color == 'b'} active={square == moveStart}>
          <img src={wikipedia[`${cell.color}${cell.type}`]} />
        </Pawn>
      )}
      {showIndexes && (
        <>
          <Letter>{square.charAt(0)}</Letter>
          <Number>{square.charAt(1)}</Number>
        </>
      )}
    </Cell>
  );
};
