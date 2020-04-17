import React, { useState, useEffect } from 'react';
import { Board, Row } from './style';
import Cell from './components/cell';
import Chess from 'chess.js';

export default ({
  debug = false,
  fen,
  onMove = null,
  flip = false,
  showPossibleMoves = true,
  showIndexes = true,
  colors = {},
  size = '100%',
  side = null,
  promotion = 'q',
}) => {
  const [moveStart, setMoveStart] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [chess, setChess] = useState(null);

  const { even = '#ead9b5', odd = '#a98865' } = colors;
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  useEffect(() => {
    if (fen) {
      debug && console.log('[Chessboard]: got new FEN: ', fen);
      setChess(new Chess(fen));
    }
  }, [fen]);

  const move = move => {
    debug && console.log('[Chessboard]: making move: ', move);
    chess.move(move) && onMove && onMove({ ...move, fen: chess.fen() });
  };

  const getBoard = board => {
    if (!flip) return board;
    let clone = [...board.reverse()];
    let result = [];
    clone.forEach(row => result.push([...row.reverse()]));
    return result;
  };

  const onCellSelect = square => {
    if (moveStart) {
      if (possibleMoves.includes(square)) {
        move({ from: moveStart, to: square, promotion });
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
  const _letters = !flip ? letters : [...letters].reverse();
  const _numbers = !flip ? numbers : [...numbers].reverse();
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
