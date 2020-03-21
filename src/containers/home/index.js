import React, { useState } from 'react';
import useChess from '../../hooks/chess';
import { Container, Chess as ChessBoard, Overlay, Numbers, Number, Letters, Letter, Board, Row } from './style';
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

export default ({}) => {
  const [moveStart, setMoveStart] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState(null);
  const [moves, setMoves] = useState([]);
  const chess = useChess();

  const move = args => {
    setMoves([...moves, chess.move(args)]);
  };

  const reset = () => {
    chess.reset();
    setMoveStart(null);
    setPossibleMoves(null);
    setMoves([]);
  };

  const clearCells = () => {
    getCells().forEach(cell => document.getElementById(cell).classList.remove('highlighted'));
  };

  const onCellSelect = square => {
    clearCells();
    if (moveStart) {
      if (possibleMoves.includes(square)) {
        move({ from: moveStart, to: square, promotion: 'q' });
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

  const gameOver = chess.game_over();
  const draw = chess.in_draw();

  return (
    <Container>
      <PlayerContainer name="Black" moves={moves} isBlack turn={chess.turn()} />
      <ChessBoard>
        {(gameOver || draw) && (
          <Overlay>
            <h2>Game Over</h2>
            <button onClick={reset}>Reset</button>
          </Overlay>
        )}
        <Numbers onClick={() => chess.load('4r3/8/2p2PPk/1p6/pP2p1R1/P1B5/2P2K2/3r4 w - - 1 45')}>
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
                      square={square}
                      onClick={() => onCellSelect(square)}
                      onDrop={e => onCellSelect(e.target.id)}
                      onDragStart={() => onCellSelect(square)}
                    />
                  );
                })}
              </Row>
            ))}
            {moves.length > 0 && <Line move={moves[moves.length - 1]} />}
          </Board>
          <Letters>
            {letters.map(letter => (
              <Letter key={letter}>{letter.toUpperCase()}</Letter>
            ))}
          </Letters>
        </div>
        <Numbers />
      </ChessBoard>
      <PlayerContainer name="White" moves={moves} turn={chess.turn()} />
    </Container>
  );
};
