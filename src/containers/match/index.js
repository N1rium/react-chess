import React, { useState, useEffect } from 'react';
import ChessBoard from 'Components/chessboard';
import Chat from 'Components/chat';
import PlaybackModule from 'Components/playback-module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { GET_MATCH, SEND_MOVE, SEND_CHAT_MESSAGE, MOVE_SUBSCRIPTION, CHAT_SUBSCRIPTION } from './queries';

import PlayerContainer from './components/player-container';
import PGNContainer from './components/pgn-container';
import { moveSound } from './sounds';

import { valuesFromPGN } from 'utils/chess-helper';

import {
  Layout,
  Game,
  GameChessboard,
  ChatContainer,
  PlaybackContainer,
  PlaybackChess,
  PlayerA,
  PlayerB,
  IconBtn,
} from './style';

export default ({ matchId }) => {
  const [match, setMatch] = useState(null);
  const [me, setMe] = useState(null);
  const [flippedBoard, setFlippedBoard] = useState(false);
  const [fenIndex, setFenIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const { data = {} } = useQuery(GET_MATCH, { variables: { id: matchId } });
  const { data: subData } = useSubscription(MOVE_SUBSCRIPTION, { variables: { id: matchId } });
  const { data: chatData } = useSubscription(CHAT_SUBSCRIPTION, { variables: { room: matchId } });
  const [sendMove] = useMutation(SEND_MOVE);
  const [sendChatMessage] = useMutation(SEND_CHAT_MESSAGE);

  useEffect(() => {
    if (chatData && chatData.chatMessage) {
      setChatMessages([...chatMessages, chatData.chatMessage]);
    }
  }, [chatData]);

  useEffect(() => {
    if (subData) {
      setMatch(subData.matchMoveMade);
    }
  }, [subData]);

  useEffect(() => {
    if (data && data.matchById) {
      const { matchById } = data;
      const { participants } = matchById;
      const self = participants.find((p) => p.user.id == data.me.id);
      setMatch(matchById);
      setMe(data.me);
      setFlippedBoard(self && self.side === 'b');
    }
  }, [data]);

  const onMove = async (data = {}) => {
    const { from, to, promotion = 'q' } = data;
    moveSound.play();
    try {
      const move = await sendMove({ variables: { input: { from, to, promotion, id: matchId } } });
      // setMatch(move.data.matchMove);
    } catch (e) {}
  };

  if (!match) return null;

  const { fen, pgn, turn, participants = [], gameOver } = match;
  const { fens, captured } = valuesFromPGN(pgn);

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
        <PlayerContainer player={blackPlayer} turn={turn} captured={captured} />
      </PlayerA>
      <PlayerB flip={flippedBoard}>
        <PlayerContainer player={whitePlayer} turn={turn} captured={captured} />
      </PlayerB>
      <PlaybackContainer>
        <header>
          <div />
          <div>Playback</div>
          <div />
        </header>
        <PlaybackChess>
          <ChessBoard fen={fens[fenIndex]} showIndexes={false} />
        </PlaybackChess>
        <footer>
          <PlaybackModule items={fens} onChange={(i) => setFenIndex(i)} />
        </footer>
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
        <header>
          {getGameHeader()}
          <IconBtn onClick={() => setFlippedBoard(!flippedBoard)}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </IconBtn>
        </header>
        <div>
          <GameChessboard>
            <ChessBoard fen={fen} side={(self && self.side) || null} flip={flippedBoard} onMove={onMove} />
          </GameChessboard>
        </div>
      </Game>
      <PGNContainer pgn={pgn} />
    </Layout>
  );
};
