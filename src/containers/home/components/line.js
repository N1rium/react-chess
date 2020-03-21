import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const SVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

export default ({ move }) => {
  const themeContext = useContext(ThemeContext);
  const { unitSize } = themeContext;
  if (!move) return null;
  const { from, to } = move;
  const fromEl = document.getElementById(from);
  const toEl = document.getElementById(to);

  return (
    <SVG width="524" height="524">
      <line
        x1={fromEl.offsetLeft + unitSize / 2}
        y1={fromEl.offsetTop + unitSize / 2}
        x2={toEl.offsetLeft + unitSize / 2}
        y2={toEl.offsetTop + unitSize / 2}
        stroke="black"
        strokeWidth="2"
      />
    </SVG>
  );
};
