import styled from 'styled-components';
import Flex from 'Components/styled/flex';
import Grid from 'Components/styled/grid';

const Layout = styled(Grid).attrs({ align: 'stretch', justify: 'stretch' })`
  display: grid;
  grid-template-areas:
    'game-info playerTop clock-a'
    'game-state game pgn'
    'chat game pgn'
    'chat game pgn'
    'chat playerBottom clock-b';
  grid-template-columns: 320px auto 320px;
  grid-template-rows: auto auto 1fr 1fr auto;
  width: 100%;
  height: 100%;
`;

const Game = styled.div`
  grid-area: game;
  & > div {
    width: 100%;
    height: 100%;
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

const PlaybackContainer = styled(Flex).attrs({ as: 'section', align: 'center', direction: 'row' })`
  grid-area: game-info;
  padding: 10px;
  text-transform: lowercase;
  & > * {
    margin-right: 10px;
    &:first-child {
      font-size: 1.5rem;
    }
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

const ClockContainer = styled.div``;

const ClockContainerA = styled(ClockContainer)`
  grid-area: ${(props) => (props.flip ? 'clock-a' : 'clock-b')};
`;

const ClockContainerB = styled(ClockContainer)`
  grid-area: ${(props) => (props.flip ? 'clock-b' : 'clock-a')};
`;

const PGNWrapper = styled.section`
  grid-area: pgn;
`;

export {
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
};
