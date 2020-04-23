import React, { useRef } from 'react';
import styled from 'styled-components';
import { wikipedia } from '../pieces';
import Pawn from 'Components/styled/pawn';

const Cell = styled.div.attrs((props) => ({
  className: `cell ${props.highlight ? 'highlighted' : ''} ${props.grabbable ? 'grabbable' : ''} ${
    props.active ? 'active' : ''
  } ${props.identity ? props.identity : ''} ${props.lastMove ? 'last-move' : ''}`,
}))`
  position: relative;
  width: 12.5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  &.highlighted {
    &:after {
      content: '';
      width: 25%;
      height: 25%;
      background: #f5f693;
      border-radius: 50%;
      position: absolute;
      pointer-events: none;
    }
  }
  &.last-move {
    background: green !important;
  }
  &.grabbable {
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
  &.active {
    background: #f5f693 !important;
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

export default ({ cell, moveStart, square, onClick, onDrop, onDragStart, lastMove, highlight, showIndexes = true }) => {
  const imgRef = useRef(null);

  return (
    <Cell
      id={square}
      identity={cell && `${cell.color}${cell.type}`}
      active={cell && square == moveStart}
      highlight={highlight}
      lastMove={lastMove}
      grabbable={cell && cell.color}
      isBlack={cell && cell.color === 'b'}
      onClick={onClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      draggable={!!cell}
      onDragStart={(e) => {
        const img = imgRef.current;
        e.dataTransfer.setDragImage(img, img.width / 2, img.width / 2);
        onDragStart(e);
      }}
      onDrop={onDrop}
    >
      {cell && (
        <Pawn isBlack={cell.color == 'b'}>
          <img ref={imgRef} src={wikipedia[`${cell.color}${cell.type}`]} />
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
