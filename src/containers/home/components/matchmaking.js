import React, { useState, useEffect } from 'react';
import history from '../../../store/history';
import gql from 'graphql-tag';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import styled from 'styled-components';
import Flex from '../../../components/styled/flex';
import GameModeIcon from '../../../components/gamemode-icon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Timer, { Counter } from '../../../components/timer';

const ME = gql`
  query me {
    me {
      id
    }
  }
`;

const JOIN_QUEUE = gql`
  mutation addToMatchmaking {
    addToMatchmaking
  }
`;

const LEAVE_QUEUE = gql`
  mutation removeFromMatchmaking {
    removeFromMatchmaking
  }
`;

const QUEUE = gql`
  subscription matchmake($userId: String!) {
    matchmake(userId: $userId) {
      userIds
      matchId
    }
  }
`;

const Matchmaking = styled.section`
  grid-area: matchmaking;
`;

const PlayButton = styled.button.attrs()`
  width: 100%;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: center;
`;

const Messages = styled.div`
  padding: 10px;
`;

const Message = styled.span`
  display: block;
  line-height: 2rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GameModes = styled(Flex).attrs({ align: 'center', justify: 'center' })`
  width: 100%;
  height: 100%;
`;

const Arrow = styled.div.attrs({ className: 'hover-btn' })`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  cursor: pointer;
`;

const ArrowLeft = styled(Arrow)`
  left: 0px;
`;

const ArrowRight = styled(Arrow)`
  right: 0px;
`;

export default () => {
  const [loading, setLoading] = useState(false);
  const [gameModes, setGameModes] = useState(['BLITZ', 'RAPID', 'CLASSICAL', 'BULLET']);
  const [gameModeIndex, setGameModeIndex] = useState(0);
  const [messages, setMessages] = useState(['Searching for match...']);
  const { data: meData } = useQuery(ME);
  const { data } = useSubscription(QUEUE, {
    variables: { userId: meData && meData.me && meData.me.id },
  });

  const [joinQueue] = useMutation(JOIN_QUEUE);
  const [leaveQueue] = useMutation(LEAVE_QUEUE);

  const click = () => {
    if (loading) leaveQueue();
    else joinQueue();
    setLoading(!loading);
  };

  useEffect(() => {
    if (data) {
      const {
        matchmake: { matchId = null },
      } = data;
      if (matchId) {
        leaveQueue();
        setLoading(false);
        history.push(`/match/${matchId}`);
      }
    }
  }, [data]);

  return (
    <Matchmaking>
      <Header>
        <div>Matchmaking</div>
        {loading && <Counter format="{mm}:{ss}">{({ time }) => <span>{time}</span>}</Counter>}
      </Header>
      <main>
        {loading && (
          <Messages>
            {messages.map((msg, i) => (
              <Message key={i}>{msg}</Message>
            ))}
          </Messages>
        )}
        {!loading && (
          <GameModes>
            <ArrowLeft onClick={() => setGameModeIndex(gameModeIndex - 1)}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </ArrowLeft>
            <GameMode type={gameModes[((gameModeIndex % gameModes.length) + gameModes.length) % gameModes.length]} />
            <ArrowRight onClick={() => setGameModeIndex(gameModeIndex + 1)}>
              <FontAwesomeIcon icon={faChevronRight} />
            </ArrowRight>
          </GameModes>
        )}
      </main>
      <Footer>
        <PlayButton loading={loading.toString()} onClick={click}>
          {loading ? <FontAwesomeIcon icon={faSpinner} spin inverse /> : <FontAwesomeIcon icon={faPlay} />}
        </PlayButton>
      </Footer>
    </Matchmaking>
  );
};

const GameModeStyled = styled.div`
  text-align: center;
  font-size: 3em;
  user-select: none;
`;
const Title = styled.div`
  font-weight: 900;
  animation: title-in 0.5s ease-in-out;
  @keyframes title-in {
    0% {
      transform: translateX(-25%);
      opacity: 0;
    }
    80% {
      transform: translateX(0%);
    }
    100% {
      opacity: 1;
    }
  }
`;

const Rules = styled.div`
  font-weight: bold;
`;

const GameMode = ({ type = 'BLITZ' }) => {
  const modes = {
    BLITZ: { title: 'Blitz', rules: '5 + 0' },
    RAPID: { title: 'Rapid', rules: '10 + 0' },
    CLASSICAL: { title: 'Classical', rules: '25 + 0' },
    BULLET: { title: 'Bullet', rules: '1 + 0' },
  };

  const { title, rules } = modes[type];

  return (
    <GameModeStyled>
      <Title>{title}</Title>
      <GameModeIcon mode={type} />
      <Rules>{rules}</Rules>
    </GameModeStyled>
  );
};
