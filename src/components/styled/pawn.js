import styled from 'styled-components';

export default styled.div.attrs({ className: 'pawn' })`
  color: ${(props) => (props.isBlack ? '#000' : '#fff')};
  transition: all 0.15s ease-in-out;
  will-change: transform, opacity;
  animation: spawn 0.15s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;

  svg {
    width: 50% !important;
    height: 50% !important;
  }

  img {
    max-width: 100%;
    width: 100%;
  }

  @keyframes spawn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;
