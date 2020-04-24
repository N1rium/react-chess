import React, { useState, useEffect } from 'react';
import { Board, Row } from './style';
import Cell from './components/cell';
import Chess from 'chess.js';

export default ({
  pgn,
  fen,
  onMove = null,
  flip = false,
  showPossibleMoves = true,
  showIndexes = true,
  colors = {},
  size = '100%',
  side = 'wb',
  promotion = 'q',
}) => {
  const [moveStart, setMoveStart] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [chess, setChess] = useState(null);
  const [highlighted, setHighlighted] = useState([]);

  const { even = '#ead9b5', odd = '#a98865' } = colors;
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  useEffect(() => {
    if (pgn) {
      const c = new Chess();
      c.load_pgn(pgn);
      const moves = c.history({ verbose: true });
      if (moves.length) {
        const { from, to } = moves[moves.length - 1];
        setHighlighted([from, to]);
      }
      setChess(c);
    } else if (fen) {
      setChess(new Chess(fen));
    }
  }, [fen, pgn]);

  const move = (move) => {
    const m = chess.move(move);
    if (m) {
      setHighlighted([m.from, m.to]);
      onMove && onMove({ ...move, fen: chess.fen() });
    }
  };

  const getBoard = (board) => {
    if (!flip) return board;
    let clone = [...board.reverse()];
    let result = [];
    clone.forEach((row) => result.push([...row.reverse()]));
    return result;
  };

  const onCellSelect = (square) => {
    if (moveStart) {
      if (possibleMoves.includes(square)) {
        move({ from: moveStart, to: square, promotion });
        setMoveStart(null);
        setPossibleMoves([]);
        return;
      }
    }

    const selectedSquare = chess.get(square);
    if (!side || (selectedSquare && !side.includes(selectedSquare.color))) return;

    setMoveStart(square);
    let re = /[a-h][1-9]/;
    const moves = chess.moves({ square, verbose: true }).map((move) => move && move.to && move.to.match(re)[0]);
    setPossibleMoves(moves.map((move) => move.slice(-2)));
  };

  if (!chess) return <Board size={size} />;

  const board = getBoard(chess.board());
  const turn = chess.turn();
  const inCheck = chess.in_check();
  const _letters = !flip ? letters : [...letters].reverse();
  const _numbers = !flip ? numbers : [...numbers].reverse();
  return (
    <Board size={size} inCheck={inCheck} turn={turn}>
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
                lastMove={highlighted.includes(square)}
                showIndexes={showIndexes}
                onClick={() => onCellSelect(square)}
                onDrop={(e) => onCellSelect(e.target.id)}
                onDragStart={() => onCellSelect(square)}
              />
            );
          })}
        </Row>
      ))}
    </Board>
  );
};
