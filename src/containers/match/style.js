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
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const InfoContainer = styled.section`
  grid-area: info;
`;

const PlaybackContainer = styled.section`
  grid-area: playback;
  footer {
    justify-content: center;
  }
`;

const PlaybackChess = styled.div`
  width: 256px;
  height: 256px;
  margin: auto;
  padding: 10px;
`;

const PlayerContainer = styled.section`
  padding: 10px;
`;

const PlayerA = styled(PlayerContainer)`
  grid-area: playera;
`;

const PlayerB = styled(PlayerContainer)`
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
