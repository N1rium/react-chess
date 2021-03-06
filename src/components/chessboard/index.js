import React, { useState, useEffect } from 'react';
import { Board, Row } from './style';
import Cell from './components/cell';
import Chess from 'chess.js';
import { fensFromPGN } from '../../utils/chess-helper';

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const NUMBERS = [8, 7, 6, 5, 4, 3, 2, 1];

export default ({
  pgn,
  fen,
  moveIndex = null,
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
  const [letters, setLetters] = useState(LETTERS);
  const [numbers, setNumbers] = useState(NUMBERS);

  useEffect(() => {
    setLetters(!flip ? LETTERS : [...LETTERS].reverse());
    setNumbers(!flip ? NUMBERS : [...NUMBERS].reverse());
  }, [flip]);

  useEffect(() => {
    if (pgn) {
      const c = new Chess();
      c.load_pgn(pgn);
      const moves = [null, ...c.history({ verbose: true })];
      if (moveIndex != null) {
        const move = moves[moveIndex];
        setHighlighted(move ? [move.from, move.to] : []);
        const fens = fensFromPGN({ pgn });
        setChess(moveIndex > 0 ? new Chess(fens[moveIndex]) : new Chess());
      } else {
        if (moves.length) {
          const move = moves[moves.length - 1];
          move && setHighlighted([move.from, move.to]);
        }
        setChess(c);
      }
    } else if (fen) {
      setChess(new Chess(fen));
    }
  }, [fen, pgn, moveIndex]);

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
    if (chess.game_over()) return;
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

  return (
    <Board size={size} inCheck={inCheck} turn={turn}>
      {board.map((row, i) => (
        <Row evenColor={even} oddColor={odd} key={i}>
          {row.map((cell, j) => {
            const square = `${letters[j]}${numbers[i]}`;
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
