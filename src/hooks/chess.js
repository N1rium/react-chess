import { useState, useEffect } from 'react';

import Chess from 'chess.js';

const useChess = () => {
  const [chess, setChess] = useState(new Chess());
  useEffect(() => {}, [chess]);
  return chess;
};

export default useChess;
