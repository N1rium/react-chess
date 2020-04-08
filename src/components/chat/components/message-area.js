import React from 'react';
import styled from 'styled-components';
import Flex from '../../../components/styled/flex';

const MessageArea = styled(Flex).attrs({ className: 'chat-message-area' })`
  flex: 1 1 auto;
  color: #fff;
  font-size: 0.8em;
  overflow-y: auto;
`;

const Messages = styled.div``;

const Message = styled(Flex)`
  padding: 0.25em 0px;
  margin: 0.125em 0px;
`;

const Name = styled.div`
  font-weight: bold;
`;

const Content = styled.div``;

const MessageComp = ({ name, content }) => {
  return (
    <Message>
      <Name>{name}: </Name>
      <Content> {content}</Content>
    </Message>
  );
};

export default ({ messages }) => {
  return (
    <MessageArea direction="column-reverse">
      <Messages>
        {messages.map((message, i) => {
          const { name, content } = message;
          return <MessageComp key={i} name={name} content={content} />;
        })}
      </Messages>
    </MessageArea>
  );
};
