import React, { useState, useEffect } from 'react';
import ChessBoard from 'Components/chessboard';
import Chat from 'Components/chat';
import PlaybackModule from 'Components/playback-module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { GET_MATCH, SEND_MOVE, SEND_CHAT_MESSAGE, MOVE_SUBSCRIPTION, CHAT_SUBSCRIPTION } from './queries';

import PlayerContainer from './components/player-container';
import { moveSound } from './sounds';

import {
  Layout,
  Game,
  GameChessboard,
  ChatContainer,
  InfoContainer,
  PlaybackContainer,
  PlaybackChess,
  PlayerA,
  PlayerB,
  IconBtn,
} from './style';

export default ({ matchId }) => {
  const [fen, setFen] = useState(null);
  const [turn, setTurn] = useState(null);
  const [fens, setFens] = useState([]);
  const [flippedBoard, setFlippedBoard] = useState(false);
  const [fenIndex, setFenIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [captured, setCaptured] = useState([]);

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
      moveSound.play();
      setFen(subData.matchMoveMade.fen);
    }
  }, [subData]);

  useEffect(() => {
    const { matchById } = data;
    if (matchById) {
      const { fen, captured, turn } = matchById;
      setCaptured(captured);
      setTurn(turn);
      setFen(fen);
      if (!fens.length) {
        const { moves = [] } = matchById;
        setFens(moves.map(m => m.fen));
      }
    }
  }, [data]);

  const onMove = async (data = {}) => {
    const { from, to, promotion = 'q' } = data;
    try {
      const move = await sendMove({ variables: { input: { from, to, promotion, id: matchId } } });
      setFen(move.data.matchMove.fen);
      setFens([...fens, move.data.matchMove.fen]);
      setCaptured(move.data.matchMove.captured);
      setTurn(move.data.matchMove.turn);
    } catch (e) {}
  };

  const onReset = () => {
    chess.reset();
    setMoveStart(null);
    setPossibleMoves([]);
    setMoveHistory([]);
  };

  return (
    <Layout>
      <InfoContainer></InfoContainer>
      <PlayerA>
        <PlayerContainer name="S. Ikonen" turn={turn} captured={captured} side="b" />
      </PlayerA>
      <PlayerB>
        <PlayerContainer name="n1rium" turn={turn} captured={captured} side="w" />
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
          <PlaybackModule items={fens} onChange={i => setFenIndex(i)} />
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
          onSendMessage={message => sendChatMessage({ variables: { input: { room: matchId, message } } })}
        ></Chat>
      </ChatContainer>
      <Game>
        <header>
          <IconBtn onClick={() => setFlippedBoard(!flippedBoard)}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </IconBtn>
        </header>
        <div>
          <GameChessboard>
            <ChessBoard fen={fen} flip={flippedBoard} onMove={onMove} onReset={onReset} />
          </GameChessboard>
        </div>
      </Game>
    </Layout>
  );
};
