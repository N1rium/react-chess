import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const PlayerImage = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 2px solid #000;
  background: #77879b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  color: #fff;a
`;

export default () => {
  return (
    <PlayerImage>
      <FontAwesomeIcon icon={faUser} />
    </PlayerImage>
  );
};
