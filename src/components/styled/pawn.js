import styled from 'styled-components';

export default styled.div.attrs(props => ({ className: `pawn ${props.active && 'active'}` }))`
  color: ${props => (props.isBlack ? '#000' : '#fff')};
  transition: all 0.15s ease-in-out;
  will-change: transform, opacity;
  &.active {
    transform: scale(1.25);
    opacity: 0.8;
  }
`;
