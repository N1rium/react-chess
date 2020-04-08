import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChessBoard from 'Components/chessboard';
import Chat from 'Components/chat';
import PlaybackModule from 'Components/playback-module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { GET_MATCH, SEND_MOVE, SEND_CHAT_MESSAGE, MOVE_SUBSCRIPTION, CHAT_SUBSCRIPTION } from './queries';

const Layout = styled.div`
  display: grid;
  padding: 10px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas:
    'info game playback'
    'info game chat'
    'footer footer footer';
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 0fr 1fr 0fr;
  justify-content: stretch;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const Game = styled.section`
  grid-area: game;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameChessboard = styled.div`
  width: 512px;
  height: 512px;
`;

const ChatContainer = styled.section`
  grid-area: chat;
  overflow: hidden;
  .chat-window {
    height: calc(100% - 45px);
  }
`;

const InfoContainer = styled.section`
  grid-area: info;
`;

const PlaybackContainer = styled.section`
  grid-area: playback;
`;

const PlaybackChess = styled.div`
  width: 256px;
  height: 256px;
  margin: 10px auto;
`;

const CogWheel = styled.div.attrs({ className: 'hover-btn' })``;

export default () => {
  const [fen, setFen] = useState(null);
  const [fens, setFens] = useState([]);
  const [fenIndex, setFenIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);

  const { data = {}, loading } = useQuery(GET_MATCH);
  const { data: subData, error } = useSubscription(MOVE_SUBSCRIPTION, { variables: { id: '0' } });
  const { data: chatData } = useSubscription(CHAT_SUBSCRIPTION, { variables: { room: '0' } });
  const [sendMove] = useMutation(SEND_MOVE);
  const [sendChatMessage] = useMutation(SEND_CHAT_MESSAGE);

  useEffect(() => {
    if (chatData && chatData.chatMessage) {
      setChatMessages([...chatMessages, chatData.chatMessage]);
    }
  }, [chatData]);

  useEffect(() => {
    if (subData) {
      setFen(subData.matchMoveMade.fen);
    }
  }, [subData]);

  useEffect(() => {
    const { matchById } = data;
    if (matchById) {
      const { fen } = matchById;
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
      const move = await sendMove({ variables: { input: { from, to, promotion, id: '0' } } });
      setFen(move.data.matchMove.fen);
      setFens([...fens, move.data.matchMove.fen]);
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
      <PlaybackContainer>
        <header>
          <div />
          <div>Playback</div>
          <div />
        </header>
        <PlaybackChess>
          <ChessBoard fen={fens[fenIndex]} showIndexes={false} />
        </PlaybackChess>
        <PlaybackModule items={fens} hasPlay={false} onChange={i => setFenIndex(i)} />
      </PlaybackContainer>
      <ChatContainer>
        <header>
          <div />
          <div>Chat</div>
          <CogWheel>
            <FontAwesomeIcon icon={faCog} />
          </CogWheel>
        </header>
        <Chat
          messages={chatMessages}
          onSendMessage={message => sendChatMessage({ variables: { input: { room: '0', message } } })}
        ></Chat>
      </ChatContainer>
      <Game>
        <GameChessboard>
          <ChessBoard fen={fen} onMove={onMove} onReset={onReset} />
        </GameChessboard>
      </Game>
    </Layout>
  );
};
