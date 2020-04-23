import Chess from 'chess.js';

const NUMERIC_ANNOTATION = /\$\d+/g;
const MOVE_NUMBER = /\d+\.(\.\.)?/g;
const COMMENT = /(\{[^}]+\})+?/g;
const HEADERS = /\[.*?\]/g;

export const fensFromPGN = ({ pgn }) => {
  const moves = movesFromPGN({ pgn });
  const chess = new Chess();
  let fens = [chess.fen()];
  moves.forEach(move => {
    chess.move(move);
    fens.push(chess.fen());
  });
  return fens;
};

export const valuesFromPGN = pgn => {
  const turns = movesFromPGN({ pgn });
  const chess = new Chess();
  let fens = [chess.fen()];
  let captured = [];
  let sans = [];
  let moves = [];
  turns.forEach(move => {
    const newMove = chess.move(move);
    if (newMove) {
      fens.push(chess.fen());
      moves.push(newMove);
      const { captured: moveCapture, color, san } = newMove;
      if (moveCapture) captured.push(`${color === 'w' ? 'b' : 'w'}${moveCapture}`);
      sans.push(san);
    }
  });
  return {
    fens,
    captured,
    sans,
    moves,
  };
};

export const movesFromPGN = ({ pgn = '', merged = true }) => {
  /* delete all headers */
  let ms = pgn.replace(HEADERS, '');

  /* delete comments */
  ms = ms.replace(COMMENT, '');

  /* delete recursive annotation variations */
  var rav_regex = /(\([^\(\)]+\))+?/g;
  while (rav_regex.test(ms)) {
    ms = ms.replace(rav_regex, '');
  }

  /* delete move numbers */
  ms = ms.replace(MOVE_NUMBER, '');

  /* delete ... indicating black to move */
  ms = ms.replace(/\.\.\./g, '');

  /* delete numeric annotation glyphs */
  ms = ms.replace(NUMERIC_ANNOTATION, '');

  /* trim and get array of moves */
  let moves = ms.trim().split(new RegExp(/\s+/));
  if (!merged) {
    const evenMoves = moves.filter((_, i) => i % 2);
    const oddMoves = moves.filter((_, i) => !(i % 2));
    return [evenMoves, oddMoves];
  }

  return moves;
};

export const headersFromPGN = ({ pgn, array = true }) => {
  const headers = pgn.match(HEADERS) || [];
  if (array) return headers;
};

export const turnsFromPGN = ({ pgn }) => {
  if (!pgn) return [];
  const moves = movesFromPGN({ pgn });
  return chunkArray(moves, 2);
};

export const chunkArray = (array, size) => {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
};
