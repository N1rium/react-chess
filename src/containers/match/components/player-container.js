import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieces from 'Components/chessboard/pieces';
import Flex from 'Components/styled/flex';

const UserInfo = styled.div``;
const Name = styled.div`
  font-weight: bold;
`;

const Captured = styled(Flex)`
  color: ${(props) => (props.side === 'w' ? '#000' : '#fff')};
  font-size: 1.5rem;
  svg {
    margin: 0px 2px;
  }
`;

const Section = styled(Flex).attrs({ as: 'section', align: 'center' })`
  padding: 10px;
  min-height: 48px;
  height: 100%;
`;

export default ({ player, captured = [] }) => {
  const { user: { username = 'Empty slot' } = {}, side } = player || {};
  return (
    <Section align="center" justify="space-between">
      <UserInfo>
        <Name>{username}</Name>
      </UserInfo>
      <Captured align="center" side={side}>
        {captured
          .filter((pawn) => pawn.charAt(0) !== side)
          .map((pawn, i) => (
            <FontAwesomeIcon key={i} icon={pieces[pawn.charAt(1)]} />
          ))}
      </Captured>
    </Section>
  );
};
