import React, { useEffect } from 'react';
import styled from 'styled-components';
import Chat from '../../components/chat';
import Profile from './components/profile';
import Play from './components/play';
import Tabs from '../../components/tabs';

import { useLazyQuery } from '@apollo/react-hooks';

const Layout = styled.div`
  display: grid;
  padding: 10px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-areas:
    'profile play'
    'chat play';
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-content: stretch;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

const ChatContainer = styled.section`
  grid-area: chat;
`;

export default () => {
  useEffect(() => {
    const token = localStorage.getItem('token', null);
    if (!token) {
      localStorage.setItem('token', '0');
    }
  }, []);

  return (
    <Layout>
      <Profile />
      <Play />
      <ChatContainer>
        <Chat />
      </ChatContainer>
    </Layout>
  );
};
