import React from 'react';
import ChessBoard from 'Components/chessboard';
import useChess from 'Hooks/chess';

export default () => {
  const { chess } = useChess();
  return <ChessBoard chess={chess} />;
};
