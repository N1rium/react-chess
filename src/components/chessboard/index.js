import React, { useState, useEffect } from 'react';
import { Board, Row } from './style';
import Cell from './components/cell';
import Chess from 'chess.js';

export default ({
  fen,
  onMove = null,
  orientationWhite = true,
  showPossibleMoves = true,
  showIndexes = true,
  colors = {},
  size = '100%',
  side = null,
}) => {
  const [moveStart, setMoveStart] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [chess, setChess] = useState(null);

  const { even = '#ead9b5', odd = '#a98865' } = colors;
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  useEffect(() => {
    if (fen) setChess(new Chess(fen));
  }, [fen]);

  const move = move => {
    chess.move(move) && onMove && onMove(move);
  };

  const getBoard = board => {
    if (orientationWhite) return board;
    let clone = [...board.reverse()];
    let result = [];
    clone.forEach(row => result.push([...row.reverse()]));
    return result;
  };

  const onCellSelect = square => {
    if (moveStart) {
      if (possibleMoves.includes(square)) {
        move({ from: moveStart, to: square, promotion: 'q' });
        setMoveStart(null);
        setPossibleMoves([]);
        return;
      }
    }
    setMoveStart(square);
    let re = /[a-h][1-9]/;
    const moves = chess.moves({ square, verbose: true }).map(move => move && move.to && move.to.match(re)[0]);
    setPossibleMoves(moves.map(move => move.slice(-2)));
  };

  if (!chess) return <Board size={size} />;

  const board = getBoard(chess.board());
  const _letters = orientationWhite ? letters : [...letters].reverse();
  const _numbers = orientationWhite ? numbers : [...numbers].reverse();
  return (
    <Board size={size}>
      {board.map((row, i) => (
        <Row evenColor={even} oddColor={odd} key={i}>
          {row.map((cell, j) => {
            const square = `${_letters[j]}${_numbers[i]}`;
            return (
              <Cell
                key={square}
                cell={cell}
                moveStart={moveStart}
                square={square}
                highlight={showPossibleMoves && possibleMoves.includes(square)}
                showIndexes={showIndexes}
                onClick={() => onCellSelect(square)}
                onDrop={e => onCellSelect(e.target.id)}
                onDragStart={() => onCellSelect(square)}
              />
            );
          })}
        </Row>
      ))}
    </Board>
  );
};
