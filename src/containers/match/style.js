import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  padding: 10px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas:
    'info playera playback'
    'info game playback'
    'info game chat'
    'info game chat'
    'info playerb chat';
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto auto 1fr 1fr 0fr;
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

const PlayerA = styled.section`
  grid-area: playera;
`;

const PlayerB = styled.section`
  grid-area: playerb;
`;

const CogWheel = styled.div.attrs({ className: 'hover-btn' })``;

export {
  Layout,
  Game,
  GameChessboard,
  ChatContainer,
  InfoContainer,
  PlaybackContainer,
  PlaybackChess,
  PlayerA,
  PlayerB,
  CogWheel,
};
