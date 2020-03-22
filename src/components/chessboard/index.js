import React, { useState } from 'react';
import { Container, Chess, Overlay, Numbers, Number, Letters, Letter, Board, Row } from './style';
import { Cell, Line, PlayerContainer } from './components';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numbers = [8, 7, 6, 5, 4, 3, 2, 1];
const getCells = () => {
  let result = [];
  letters.forEach(letter => {
    numbers.forEach(number => {
      result.push(`${letter}${number}`);
    });
  });
  return result;
};

export default ({ chess, white = {}, black = {}, onMove = null, onReset = null }) => {
  const [moveStart, setMoveStart] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState(null);

  const { name: whiteName = 'White' } = white;
  const { name: blackName = 'Black' } = black;
  const { moveHistory, gameOver, draw } = chess;

  const clearCells = () => {
    getCells().forEach(cell => document.getElementById(cell).classList.remove('highlighted'));
  };

  const onCellSelect = square => {
    clearCells();
    if (moveStart) {
      if (possibleMoves.includes(square)) {
        onMove({ from: moveStart, to: square, promotion: 'q' });
        setMoveStart(null);
        return;
      }
    }
    setMoveStart(square);
    let re = /[a-h][1-9]/;
    const moves = chess.moves({ square, verbose: true }).map(move => move && move.to && move.to.match(re)[0]);
    setPossibleMoves(moves.map(move => move.slice(-2)));
    moves.forEach(move => {
      document.getElementById(move.slice(-2)).classList.add('highlighted');
    });
  };

  return (
    <Container>
      <PlayerContainer name={blackName} moves={moveHistory} isBlack turn={chess.turn()} />
      <Chess>
        {(gameOver || draw) && (
          <Overlay>
            <h2>Game Over</h2>
            <button onClick={onReset}>Reset</button>
          </Overlay>
        )}
        <Numbers>
          {numbers.map(number => (
            <Number key={number}>{number}</Number>
          ))}
        </Numbers>
        <div>
          <Letters />
          <Board>
            {chess.board().map((row, i) => (
              <Row key={i}>
                {row.map((cell, j) => {
                  const square = `${letters[j]}${numbers[i]}`;
                  return (
                    <Cell
                      key={j}
                      cell={cell}
                      moveStart={moveStart}
                      square={square}
                      onClick={() => onCellSelect(square)}
                      onDrop={e => onCellSelect(e.target.id)}
                      onDragStart={() => onCellSelect(square)}
                    />
                  );
                })}
              </Row>
            ))}
            {moveHistory.length > 0 && <Line move={moveHistory[moveHistory.length - 1]} />}
          </Board>
          <Letters>
            {letters.map(letter => (
              <Letter key={letter}>{letter.toUpperCase()}</Letter>
            ))}
          </Letters>
        </div>
        <Numbers />
      </Chess>
      <PlayerContainer name={whiteName} moves={moveHistory} turn={chess.turn()} />
    </Container>
  );
};
