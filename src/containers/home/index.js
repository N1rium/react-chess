import React, { useEffect } from 'react';
import styled from 'styled-components';
import Profile from '../../components/profile';
import Chat from '../../components/chat';

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

const ProfileContainer = styled.section`
  grid-area: profile;
`;

const Play = styled.section`
  grid-area: play;
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
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
      <Play>
        <button onClick={() => (window.location.href = '/match/0')}>Go to match</button>
      </Play>
      <ChatContainer>
        <Chat />
      </ChatContainer>
    </Layout>
  );
};
