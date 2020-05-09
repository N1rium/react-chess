import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/styled/button';
import Flex from '../../components/styled/flex';
import { MessageArea } from './components';

const Chat = styled(Flex).attrs({ className: 'chat-window' })`
  width: 100%;
  height: 100%;
`;

const InputArea = styled(Flex).attrs({ as: 'form' })`
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input.attrs({ type: 'text', placeholder: 'Send a message' })`
  flex: 1 1 auto;
`;

export default ({ messages = [], onSendMessage = null, minLength = 1, delay = 500 }) => {
  const [message, setMessage] = useState('');
  const [canSend, setCanSend] = useState(true);

  const sendMessage = (e) => {
    e && e.preventDefault();
    if (message.length < minLength || !canSend) return;
    onSendMessage && onSendMessage(message);
    setMessage('');
    setCanSend(false);
    setTimeout(() => {
      setCanSend(true);
    }, delay);
  };

  return (
    <Chat direction="column">
      <MessageArea messages={messages} />
      <InputArea onSubmit={sendMessage}>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      </InputArea>
    </Chat>
  );
};
