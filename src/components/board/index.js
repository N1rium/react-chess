import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Chess from 'chess.js';
import { wikipedia } from '../chessboard/pieces';
import { fensFromPGN } from '../../utils/chess-helper';

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const NUMBERS = [8, 7, 6, 5, 4, 3, 2, 1];

const Board = styled.div`
  position: relative;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  width: ${(props) => `calc(29.5px)`};
  height: ${(props) => `calc(29.5px)`};
  background: #ead9b5;
  &:nth-child(2n + 1) {
    background: #a98865;
  }
  &.even {
    background: #a98865;
    &:nth-child(2n + 1) {
      background: #ead9b5;
    }
  }
`;

const Pawn = styled.div.attrs({ className: 'pawn' })`
  color: ${(props) => (props.isBlack ? '#000' : '#fff')};
  transition: all 0.15s ease-in-out;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29.5px;
  height: 29.5px;
  pointer-events: none;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;

  transform: ${(props) => `translate3d(${props.x * 100}%, ${props.y * 100}%, 0)`};

  img {
    max-width: 100%;
    width: 100%;
  }
`;

export default ({ size = '256px', fen }) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    let chess = new Chess(fen);

    const b = [];
    chess.board().forEach((row, i) => {
      row.forEach((col, j) => {
        if (col) {
          b.push({
            ...col,
            cell: `${LETTERS[j]}${NUMBERS[i]}`,
          });
        }
      });
    });

    setBoard(b);
  }, [fen]);

  return (
    <Board size={size}>
      {LETTERS.map((letter, i) => (
        <Row key={i}>
          {NUMBERS.map((number, j) => (
            <Cell key={j} size={size} className={i % 2 == 0 && 'even'} />
          ))}
        </Row>
      ))}
      {board.map((pawn, i) => (
        <Pawn
          key={i}
          isBlack={pawn.color === 'b'}
          size={size}
          x={LETTERS.indexOf(pawn.cell.charAt(0))}
          y={NUMBERS.indexOf(+pawn.cell.charAt(1))}
        >
          <img src={wikipedia[`${pawn.color}${pawn.type}`]} />
        </Pawn>
      ))}
    </Board>
  );
};
