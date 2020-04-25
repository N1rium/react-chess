import React, { useState } from 'react';
import history from '../../../store/history';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';

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

export default () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(['Searching for match...', 'Found opponent!']);

  return (
    <Matchmaking>
      <header>Matchmaking</header>
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
        <PlayButton loading={loading.toString()} onClick={() => setLoading(!loading)}>
          {loading ? <FontAwesomeIcon icon={faSpinner} spin inverse /> : <FontAwesomeIcon icon={faPlay} />}
        </PlayButton>
      </Footer>
    </Matchmaking>
  );
};
