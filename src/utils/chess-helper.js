export const movesFromPGN = ({ pgn = '', merged = true }) => {
  let ms = pgn;
  /* delete comments */
  ms = ms.replace(/(\{[^}]+\})+?/g, '');

  /* delete recursive annotation variations */
  var rav_regex = /(\([^\(\)]+\))+?/g;
  while (rav_regex.test(ms)) {
    ms = ms.replace(rav_regex, '');
  }

  /* delete move numbers */
  ms = ms.replace(/\d+\.(\.\.)?/g, '');

  /* delete ... indicating black to move */
  ms = ms.replace(/\.\.\./g, '');

  /* delete numeric annotation glyphs */
  ms = ms.replace(/\$\d+/g, '');

  /* trim and get array of moves */
  let moves = ms.trim().split(new RegExp(/\s+/));
  if (!merged) {
    const evenMoves = moves.filter((_, i) => i % 2);
    const oddMoves = moves.filter((_, i) => !(i % 2));
    return [evenMoves, oddMoves];
  }

  return moves;
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
