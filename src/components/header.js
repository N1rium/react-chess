import React from 'react';
import history from '../store/history';
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
  background: ${(props) => props.theme.surface};
  font-weight: bold;
  padding: 0 20px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.24);
  svg {
    font-size: 1.5rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
  margin-left: 0.5em;
  font-weight: 900;
  text-decoration: underline;
  span {
    font-weight: normal;
    font-size: 0.6rem;
  }
`;

export default ({}) => {
  return (
    <Header>
      <Flex align="center">
        <FontAwesomeIcon icon={faChessKnight} />
        <Title onClick={() => history.push('/')}>
          Chessports
          {/* <span>.com</span> */}
        </Title>
      </Flex>
    </Header>
  );
};
