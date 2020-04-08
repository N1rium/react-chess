import React from 'react';
import styled from 'styled-components';
import Flex from '../components/styled/flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  background: #232323;
  color: #fff;
  font-weight: bold;
  padding: 0 20px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.24);
  svg {
    font-size: 1.5em;
  }
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.25em;
  margin-left: 0.5em;
  font-weight: 900;
`;

const Contacts = styled.div``;

const Contact = styled.a.attrs({
  href: 'https://github.com/N1rium/react-chess',
  target: '_blank',
  className: 'hover-btn',
})`
  color: #fff;
`;

export default ({}) => {
  return (
    <Header>
      <Flex align="center">
        <FontAwesomeIcon icon={faChessKnight} />
        <Title>Chess esports</Title>
      </Flex>
      <Contacts>
        <Contact>Github</Contact>
      </Contacts>
    </Header>
  );
};
