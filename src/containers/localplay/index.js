import React, { useState } from 'react';
import ChessBoard from 'Components/chessboard';
import Chess from 'chess.js';

export default () => {
  const [chess, setChess] = useState(new Chess());
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);

  const onMove = (data = {}) => {
    setMoveHistory([...moveHistory, chess.move(data)]);
  };

  const onReset = () => {
    chess.reset();
    // setMoveStart(null);
    setPossibleMoves([]);
    setMoveHistory([]);
  };

  const chessObj = { ...chess, moveHistory, possibleMoves, gameOver: chess.game_over(), draw: chess.in_draw() };

  return <ChessBoard chess={chessObj} onMove={onMove} onReset={onReset} />;
};
