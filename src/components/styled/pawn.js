import styled from 'styled-components';

export default styled.div.attrs({ className: 'pawn' })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  img {
    max-width: 100%;
    width: 100%;
  }
`;
