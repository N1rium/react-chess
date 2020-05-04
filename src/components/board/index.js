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
  height: 12.5%;
  width: 100%;
`;

const Cell = styled.div`
  width: 12.5%;
  height: 100%;
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
  width: 12.5%;
  height: 12.5%;
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

const Index = styled.div`
  pointer-events: none;
  position: absolute;
  & > div {
    color: #ead9b5;
    padding: 2px;
    &:nth-child(2n + 0) {
      color: #a98865;
    }
  }
`;

const Letters = styled(Index)`
  display: flex;
  align-items: flex-end;
  bottom: 0;
  left: 0;
  height: 12.5%;
  width: 100%;
  & > div {
    width: 12.5%;
  }
`;

const Numbers = styled(Index)`
  top: 0;
  right: 0;
  width: 12.5%;
  height: 100%;
  text-align: right;
  & > div {
    height: 12.5%;
  }
`;

export default ({ size = '100%', fen, flip = false, showIndexes = true }) => {
  const [board, setBoard] = useState([]);
  const [letters, setLetters] = useState(LETTERS);
  const [numbers, setNumbers] = useState(NUMBERS);

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

    if (!board.length) {
      setBoard(b);
      return;
    }

    let clone = [...board];

    const to = [];
    b.forEach((p, i) => {
      const found = clone.find((pawn) => JSON.stringify(pawn) == JSON.stringify(p));
      if (!found) {
        to.push(p);
      }
    });

    const from = [];
    clone.forEach((p, i) => {
      const found = b.find((pawn) => JSON.stringify(pawn) == JSON.stringify(p));
      if (!found) {
        from.push(p);
      }
    });

    console.warn(from, to);

    from.forEach((f, index) => {
      clone[clone.findIndex((i) => i.cell == f.cell)] = to[index];
    });

    setBoard(clone);
  }, [fen]);

  useEffect(() => {
    setLetters(!flip ? LETTERS : [...LETTERS].reverse());
    setNumbers(!flip ? NUMBERS : [...NUMBERS].reverse());
  }, [flip]);

  return (
    <Board size={size}>
      {letters.map((letter, i) => (
        <Row key={i}>
          {numbers.map((number, j) => (
            <Cell key={j} size={size} className={i % 2 == 0 && 'even'} />
          ))}
        </Row>
      ))}
      {board.map((pawn, i) => (
        <Pawn
          key={i}
          isBlack={pawn.color === 'b'}
          x={letters.indexOf(pawn.cell.charAt(0))}
          y={numbers.indexOf(+pawn.cell.charAt(1))}
        >
          <img src={wikipedia[`${pawn.color}${pawn.type}`]} />
        </Pawn>
      ))}
      {showIndexes && (
        <>
          <Letters>
            {letters.map((l) => (
              <div>{l}</div>
            ))}
          </Letters>
          <Numbers>
            {numbers.map((n) => (
              <div>{n}</div>
            ))}
          </Numbers>
        </>
      )}
    </Board>
  );
};
