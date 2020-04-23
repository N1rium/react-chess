import React from 'react';
import styled from 'styled-components';
import Chat from '../../components/chat';
import Profile from './components/profile';
import Play from './components/play';

const Layout = styled.div`
  display: grid;
  padding: 10px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas:
    'profile lobbies'
    'chat ongoing';
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-content: stretch;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const ChatContainer = styled.section`
  grid-area: chat;
  .chat-window {
    height: calc(100% - 45px);
  }
`;

const OngoingContainer = styled.section`
  grid-area: ongoing;
`;

export default () => {
  return (
    <Layout>
      <Profile />
      <Play />
      <ChatContainer>
        <header>Chat</header>
        <Chat />
      </ChatContainer>
      <OngoingContainer>
        <header>Ongoing</header>
      </OngoingContainer>
    </Layout>
  );
};
