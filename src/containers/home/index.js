import React, { useState, useEffect } from 'react';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Grid from 'Components/styled/grid';
import Chat from '../../components/chat';
import Profile from './components/profile';
import Play from './components/play';
import Ongoing from './components/ongoing';
import Finished from './components/finished';
import Matchmaking from './components/matchmaking';
import Friends from './components/friends';

export const SEND_CHAT_MESSAGE = gql`
  mutation sendChatMessage($input: ChatMessageInput!) {
    sendChatMessage(input: $input) {
      sender
      content
    }
  }
`;

export const CHAT_SUBSCRIPTION = gql`
  subscription chatMessage($room: String!) {
    chatMessage(room: $room) {
      sender
      content
    }
  }
`;

const Layout = styled(Grid).attrs({ align: 'stretch', justify: 'stretch' })`
  display: grid;
  grid-template-areas:
    'profile lobbies lobbies matchmaking'
    'friends chat ongoing finished';
  grid-template-columns: 320px auto auto 320px;
  grid-template-rows: 50% auto;
  width: 100%;
  height: 100%;
`;

const ChatContainer = styled.section`
  grid-area: chat;
  .chat-window {
    height: calc(100% - 45px);
  }
`;

export default () => {
  const [chatMessages, setChatMessages] = useState([]);
  const { data: chatData } = useSubscription(CHAT_SUBSCRIPTION, { variables: { room: 'global' } });
  const [sendChatMessage] = useMutation(SEND_CHAT_MESSAGE);

  useEffect(() => {
    if (chatData && chatData.chatMessage) {
      setChatMessages([...chatMessages, chatData.chatMessage]);
    }
  }, [chatData]);

  return (
    <Layout>
      <Profile />
      <Friends />
      <Play />
      <Matchmaking />
      <ChatContainer>
        <header>Chat</header>
        <Chat
          messages={chatMessages}
          onSendMessage={(message) => sendChatMessage({ variables: { input: { room: 'global', message } } })}
        />
      </ChatContainer>
      <Ongoing />
      <Finished />
    </Layout>
  );
};
