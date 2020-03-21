import styled from 'styled-components';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Chess = styled.div`
  display: flex;
  position: relative;
  background: #101010;
  border-radius: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const Numbers = styled.div`
  height: 100%;
  width: ${props => `${props.theme.unitSize / 2}px`};
  margin-top: ${props => `${props.theme.unitSize / 2}px`};
`;

const Number = styled.div`
  display: flex;
  height: ${props => `${props.theme.unitSize}px`};
  align-items: center;
  justify-content: center;
  width: ${props => `${props.theme.unitSize / 2}px`};
  color: #fff;
  font-weight: bold;
`;

const Letters = styled.div`
  display: flex;
  height: ${props => `${props.theme.unitSize / 2}px`};
  width: 100%;
`;

const Letter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => `${props.theme.unitSize}px`};
  height: ${props => `${props.theme.unitSize / 2}px`};
  color: #fff;
  font-weight: bold;
`;

const Board = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;
`;

const Row = styled.div.attrs({ className: 'row' })`
  display: flex;
  .cell {
    background: #77879b;
    &:nth-child(2n + 1) {
      background: #383d59;
    }
  }

  &:nth-child(2n + 1) {
    .cell {
      background: #383d59;
      &:nth-child(2n + 1) {
        background: #77879b;
      }
    }
  }
`;

const Pawn = styled.div.attrs({ className: 'pawn' })`
  color: ${props => (props.isBlack ? '#000' : '#fff')};
  background: transparent;
`;

export { Container, Chess, Overlay, Numbers, Number, Letters, Letter, Board, Row, Pawn };
