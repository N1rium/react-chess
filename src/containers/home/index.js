import React, { useState, useEffect } from 'react';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Chat from '../../components/chat';
import Profile from './components/profile';
import Play from './components/play';
import Ongoing from './components/ongoing';
import Finished from './components/finished';
import Matchmaking from './components/matchmaking';

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

const Layout = styled.div`
  display: grid;
  padding: 10px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas:
    'profile lobbies lobbies matchmaking'
    'chat chat ongoing finished';
  grid-template-columns: auto;
  grid-template-rows: 50% auto;
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
