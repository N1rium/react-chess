import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  background: #101010;
  color: #fff;
  font-weight: bold;
  padding: 0 32px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.25em;
`;

const Contacts = styled.div``;

const Contact = styled.div`
  color: #fff;
  will-change: opacity;
  transition: opacity 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export default ({}) => {
  return (
    <Header>
      <Title>React Chess</Title>
      <Contacts>
        <Contact>Github</Contact>
      </Contacts>
    </Header>
  );
};
