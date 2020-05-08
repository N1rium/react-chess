import React, { useState, useEffect } from 'react';
import ChessBoard from 'Components/chessboard';
import Chat from 'Components/chat';
import PlaybackModule from 'Components/playback-module';
import GameModeIcon from 'Components/gamemode-icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSyncAlt, faFlag } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { GET_MATCH, SEND_MOVE, SEND_CHAT_MESSAGE, MOVE_SUBSCRIPTION, CHAT_SUBSCRIPTION, FORFEIT } from './queries';

import PlayerContainer from './components/player-container';
import PGNContainer from './components/pgn-container';
import ClockContainer from './components/clock-container';
import { moveSound } from './sounds';

import { valuesFromPGN } from 'utils/chess-helper';

import {
  ClockContainerA,
  ClockContainerB,
  Layout,
  Game,
  GameChessboard,
  ChatContainer,
  PlaybackContainer,
  PlaybackChess,
  PlayerA,
  PlayerB,
  IconBtn,
  IconGroup,
  PGNWrapper,
} from './style';

export default ({ matchId }) => {
  const [match, setMatch] = useState(null);
  const [me, setMe] = useState(null);
  const [flippedBoard, setFlippedBoard] = useState(false);
  const [fenIndex, setFenIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const { data = {} } = useQuery(GET_MATCH, { fetchPolicy: 'network-only', variables: { id: matchId } });
  const { data: subData } = useSubscription(MOVE_SUBSCRIPTION, { variables: { id: matchId } });
  const { data: chatData } = useSubscription(CHAT_SUBSCRIPTION, { variables: { room: matchId } });
  const [sendMove] = useMutation(SEND_MOVE);
  const [sendChatMessage] = useMutation(SEND_CHAT_MESSAGE);
  const [forfeit] = useMutation(FORFEIT);

  const [pgnValues, setPgnValues] = useState(null);

  useEffect(() => {
    if (chatData && chatData.chatMessage) {
      setChatMessages([...chatMessages, chatData.chatMessage]);
    }
  }, [chatData]);

  useEffect(() => {
    if (subData) {
      const { matchMoveMade } = subData;
      moveSound.play();
      setMatch(matchMoveMade);
    }
  }, [subData]);

  useEffect(() => {
    if (data && data.matchById) {
      const { matchById } = data;
      const { participants } = matchById;
      const self = participants.find((p) => p.user.id == data.me.id);
      const values = valuesFromPGN(matchById.pgn);
      setPgnValues(values);
      setFenIndex(values.fens.length - 1);
      setMatch(matchById);
      setMe(data.me);
      setFlippedBoard(self && self.side === 'b');
    }
  }, [data]);

  const onMove = (data = {}) => {
    const { from, to, promotion = 'q' } = data;
    sendMove({ variables: { input: { from, to, promotion, id: matchId } } });
  };

  if (!match) return null;

  const { pgn, turn, participants = [], gameOver, timeControl, type, rated } = match;
  const { fens, captured } = pgnValues;

  const getGameHeader = () => {
    const turns = {
      w: 'White',
      b: 'Black',
    };
    if (gameOver) {
      return 'Match has ended!';
    }
    return `${turns[turn]}s turn!`;
  };

  const whitePlayer = participants.find((p) => p.side == 'w') || null;
  const blackPlayer = participants.find((p) => p.side == 'b') || null;
  const self = participants.find((p) => p.user.id == me.id);

  return (
    <Layout>
      <PlayerA flip={flippedBoard}>
        <PlayerContainer
          player={blackPlayer}
          turn={turn}
          captured={captured}
          gameOver={gameOver}
          timeControl={timeControl}
        />
      </PlayerA>
      <ClockContainerA flip={flippedBoard}>
        <ClockContainer match={match} player={whitePlayer} />
      </ClockContainerA>
      <PlayerB flip={flippedBoard}>
        <PlayerContainer
          player={whitePlayer}
          turn={turn}
          captured={captured}
          gameOver={gameOver}
          timeControl={timeControl}
        />
      </PlayerB>
      <ClockContainerB flip={flippedBoard}>
        <ClockContainer match={match} player={blackPlayer} />
      </ClockContainerB>
      <PlaybackContainer>
        <GameModeIcon mode={type} />
        <div>{type}</div>
        <div>{rated ? 'Rated' : 'Casual'}</div>
      </PlaybackContainer>
      <ChatContainer>
        <header>
          <div />
          <div>Chat</div>
          <IconBtn>
            <FontAwesomeIcon icon={faCog} />
          </IconBtn>
        </header>
        <Chat
          messages={chatMessages}
          onSendMessage={(message) => sendChatMessage({ variables: { input: { room: matchId, message } } })}
        ></Chat>
      </ChatContainer>
      <Game>
        <div>
          <GameChessboard>
            <ChessBoard
              pgn={pgn}
              // moveIndex={fenIndex}
              side={(self && self.side) || null}
              flip={flippedBoard}
              onMove={onMove}
            />
          </GameChessboard>
        </div>
      </Game>
      <PGNWrapper>
        <header>
          {/* {getGameHeader()} */}
          <IconGroup>
            {!gameOver && self && (
              <IconBtn onClick={() => forfeit({ variables: { matchId } })}>
                <FontAwesomeIcon icon={faFlag} />
              </IconBtn>
            )}
            <IconBtn onClick={() => setFlippedBoard(!flippedBoard)}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </IconBtn>
          </IconGroup>
        </header>
        <PGNContainer pgn={pgn} />
        <footer>
          <PlaybackModule value={fenIndex} items={fens} onChange={(i) => setFenIndex(i)} />
        </footer>
      </PGNWrapper>
    </Layout>
  );
};
