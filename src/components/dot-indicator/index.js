import React from 'react';
import styled from 'styled-components';
import Flex from 'Components/styled/flex';

const DotIndicator = styled(Flex).attrs({ align: 'center', justify: 'center' })``;
const Dot = styled.div.attrs((props) => ({ className: `${props.active ? 'active' : 'inactive'}` }))`
  width: 8px;
  height: 8px;
  border-radius: 1px;
  margin: 10px 2.5px;
  background: ${(props) => props.theme.background};
  transform: scale(1);
  will-change: transform;
  transition: all 0.225s ease-in-out;
  &.active {
    background: #fff;
    transform: scale(1.15);
  }
`;

export default ({ value, values = [] }) => {
  return (
    <DotIndicator>
      {values.map((v, i) => (
        <Dot key={i} active={value === i} />
      ))}
    </DotIndicator>
  );
};
