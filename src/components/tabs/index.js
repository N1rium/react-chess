import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Tabs = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Tab = styled.div`
  color: ${props => (props.active ? props.theme.primaryTextColor : props.theme.secondaryTextColor)};
  transition: all 0.25s ease-in-out;
  font-weight: bold;
  margin: 0px 5px;
  margin-bottom: 2px;
  &:hover {
    cursor: pointer;
  }
`;

const Highlight = styled.div`
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: ${props => `translateX(${props.left}px)`};
  width: ${props => `${props.width}px`};
  background-color: ${props => (props.theme.dark ? props.theme.accentColor : props.theme.primaryTextColor)};
  will-change: transform;
  transition: all 0.25s ease-in-out;
`;

export default ({ tabs = [], index = 0, onChange }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const tabChange = index => {
    onChange && onChange(index);
  };

  const recalculate = () => {
    const {
      current: { childNodes },
    } = ref;
    const { clientWidth, offsetLeft } = childNodes[index];
    setWidth(clientWidth);
    setLeft(offsetLeft);
  };

  useEffect(recalculate, [index, windowSize]);

  useEffect(() => {
    const listener = window.addEventListener('resize', () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    );
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return (
    <Tabs ref={ref}>
      {tabs.map((tab, i) => (
        <Tab key={i} active={i === index} onClick={() => tabChange(i)}>
          {tab}
        </Tab>
      ))}
      {tabs.length > 0 && <Highlight index={index} left={left} width={width} />}
    </Tabs>
  );
};
