import React from 'react';
import styled from 'styled-components';

export const SpinnerContainer = styled.div.attrs({ className: 'spinner-container' })`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Spinner = styled.div.attrs({ className: 'spinner' })`
  box-sizing: border-box;
  animation: spinner-rotate 0.6s linear infinite;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: #fff;
  border-bottom-color: #fff;

  @keyframes spinner-rotate {
    from {
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
`;

export default ({ color }) => {
  return (
    <SpinnerContainer>
      <Spinner color={color} />
    </SpinnerContainer>
  );
};
