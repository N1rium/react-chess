export const GameState = {
  GAMEOVER: 'GAMEOVER',
  CHECKMATE: 'CHECKMATE',
  STALEMATE: 'STALEMATE',
  THREEFOLD: 'THREEFOLD',
  DRAW: 'DRAW',
  RESIGN: 'RESIGN',
  TIMEOUT: 'TIMEOUT',
  WHITE: 'WHITE',
  BLACK: 'BLACK',
};

export const getGameHeader = (match) => {
  const state = getGameState(match);
  const { turn = 'w', participants } = match;

  if (!match || !participants) return null;

  if (state === GameState.DRAW) {
    return 'Draw';
  }
  if (state === GameState.STALEMATE) {
    return 'Stalemate';
  }
  if (state === GameState.THREEFOLD) {
    return 'Threefold';
  }

  if (state === GameState.GAMEOVER) {
    const winner = participants.find((p) => p.winner === true);
    console.log(winner);
    if (!winner) return 'Game over';
    const {
      user: { username },
    } = winner;
    return `Game over - ${username} wins`;
  }

  if (state === GameState.CHECKMATE) {
    const winner = participants.find((p) => p.winner === true);
    console.log(winner);
    if (!winner) return 'Checkmate';
    const {
      user: { username },
    } = winner;
    return `Checkmate - ${username} wins`;
  }

  if (state === GameState.RESIGN) {
    const winner = participants.find((p) => p.winner === true);
    if (!winner) return 'Resign';
    const {
      user: { username },
    } = winner;
    return `Resign - ${username} wins`;
  }

  if (state === GameState.TIMEOUT) {
    const winner = participants.find((p) => p.side !== turn);
    if (!winner) return 'Time out';
    const {
      user: { username },
    } = winner;
    return `Time out - ${username} wins`;
  }

  if (state === GameState.WHITE || state === GameState.BLACK) {
    const participantTurn = participants.find((p) => p.side === turn);
    if (!participantTurn) {
      return `${turn === 'w' ? 'Whites' : 'Blacks'} turn`;
    }
    const {
      user: { username },
    } = participantTurn;
    return `${username} turn`;
  }
};

export const getGameState = (match) => {
  if (!match) return null;
  const {
    gameOver = false,
    turn = 'w',
    draw = false,
    forfeit = false,
    timedout = false,
    checkmate = false,
    stalemate = false,
    threefold = false,
  } = match;

  if (gameOver === true) {
    /* Checkmate */
    if (checkmate === true) {
      return GameState.CHECKMATE;
    }

    /* Draw */
    if (draw === true) {
      if (stalemate) return GameState.STALEMATE;
      if (threefold) return GameState.THREEFOLD;
      return GameState.DRAW;
    }

    /* Forfeit */
    if (forfeit === true) {
      return GameState.RESIGN;
    }

    /* Time out */
    if (timedout === true) {
      return GameState.TIMEOUT;
    }

    return GameState.GAMEOVER;
  } else {
    /* Ongoing game */
    return turn === 'w' ? GameState.WHITE : GameState.BLACK;
  }
};
