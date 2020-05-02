import Chess from 'chess.js';

export const NUMERIC_ANNOTATION = /\$\d+/g;
export const MOVE_NUMBER = /\d+\.(\.\.)?/g;
export const COMMENT = /(\{[^}]+\})+?/g;
export const HEADERS = /\[.*?\]/g;

export const RESULT = {
  WHITE_WON: '1-0',
  BLACK_WON: '0-1',
  DRAW: '1/2-1/2',
  OTHER: '*',
};

export const RATING = {
  BULLET: 'BULLET',
  BLITZ: 'BLITZ',
  RAPID: 'RAPID',
  CLASSICAL: 'CLASSICAL',
};

export const fensFromPGN = ({ pgn }) => {
  const moves = movesFromPGN({ pgn });
  const chess = new Chess();
  let fens = [chess.fen()];
  moves.forEach((move) => {
    chess.move(move);
    fens.push(chess.fen());
  });
  return fens;
};

export const valuesFromPGN = (pgn) => {
  const turns = movesFromPGN({ pgn });
  const chess = new Chess();
  let fens = [chess.fen()];
  let captured = [];
  let sans = [];
  let moves = [];
  turns.forEach((move) => {
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

export const fenToObj = (fen) => {
  // cut off any move, castling, etc info from the end
  // we're only interested in position information
  fen = fen.replace(/ .+$/, '');

  let rows = fen.split('/');
  let position = {};

  let currentRow = 8;
  for (let i = 0; i < 8; i++) {
    let row = rows[i].split('');
    let colIdx = 0;

    // loop through each character in the FEN section
    for (let j = 0; j < row.length; j++) {
      // number / empty squares
      if (row[j].search(/[1-8]/) !== -1) {
        let numEmptySquares = parseInt(row[j], 10);
        colIdx = colIdx + numEmptySquares;
      } else {
        // piece
        let square = COLUMNS[colIdx] + currentRow;
        position[square] = fenToPieceCode(row[j]);
        colIdx = colIdx + 1;
      }
    }

    currentRow = currentRow - 1;
  }

  return position;
};

/* ================================================ ELO ========================================================== */

/* Get expected ELO */
export const expectedELO = (a, b) => {
  return 1 / (1 + Math.pow(10, (b - a) / 400));
};

/* Get updated ELO from expected */
export const updateELO = (expected, result, current, k = 20) => {
  return Math.round(current + k * (result - expected));
};

/* Get expected ELO and update it */
export const eloChange = (a, b, res, k = 20) => {
  const expected = expectedELO(a, b);
  return updateELO(expected, res, a, k);
};

/* ====================================== GAME MODE / TIME CONTROLS =============================================== */

//https://support.chess.com/article/330-why-are-there-different-ratings-in-live-chess
export const getTimeFromTimeControl = (minutes, increment, avgMoves = 40) => {
  const minutesInMilliseconds = minutes * 60 * 1000;
  return minutesInMilliseconds + avgMoves * (increment * 1000);
};

export const getRatingFromTimeControl = (minutes, increment, avgMoves = 40) => {
  const ms = getTimeFromTimeControl(minutes, increment, avgMoves);
  const MINUTE = 1000 * 60;
  if (ms <= MINUTE * 3) return RATING.BULLET;
  if (ms <= MINUTE * 10) return RATING.BLITZ;
  if (ms <= MINUTE * 20) return RATING.RAPID;
  return RATING.CLASSICAL;
};
