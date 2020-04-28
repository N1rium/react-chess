import React, { useState, useEffect } from 'react';
import history from '../../../store/history';
import gql from 'graphql-tag';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';

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

export default () => {
  const [loading, setLoading] = useState(false);
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
    console.warn(data);
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
      </main>
      <Footer>
        <PlayButton loading={loading.toString()} onClick={click}>
          {loading ? <FontAwesomeIcon icon={faSpinner} spin inverse /> : <FontAwesomeIcon icon={faPlay} />}
        </PlayButton>
      </Footer>
    </Matchmaking>
  );
};
