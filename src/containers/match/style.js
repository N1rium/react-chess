import styled from 'styled-components';
import Flex from 'Components/styled/flex';

const Layout = styled.div`
  display: grid;
  padding: 10px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas:
    'chat playerTop playback'
    'chat game playback'
    'chat game pgn'
    'chat game pgn'
    'chat playerBottom pgn';
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto auto 1fr 1fr auto;
  justify-content: stretch;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const Game = styled.section`
  grid-area: game;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & > div {
    width: 100%;
    height: calc(100% - 45px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const GameChessboard = styled.div`
  width: 512px;
  height: 512px;
`;

const ChatContainer = styled.section`
  grid-area: chat;
  .chat-window {
    height: calc(100% - 45px);
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const PlaybackContainer = styled.section`
  grid-area: playback;
  footer,
  header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PlaybackChess = styled.div`
  width: 256px;
  height: 256px;
  margin: auto;
  padding: 10px;
`;

const PlayerContainer = styled.div``;

const PlayerA = styled(PlayerContainer)`
  grid-area: ${(props) => (props.flip ? 'playerBottom' : 'playerTop')};
`;

const PlayerB = styled(PlayerContainer)`
  grid-area: ${(props) => (props.flip ? 'playerTop' : 'playerBottom')};
`;

const IconBtn = styled.div.attrs({ className: 'hover-btn' })``;

const IconGroup = styled(Flex).attrs({ align: 'center' })`
  & > * {
    margin-left: 10px;
  }
`;

export {
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
};
