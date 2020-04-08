import styled from 'styled-components';

const Board = styled.div`
  position: relative;
  cursor: pointer;
  width: ${props => props.size};
  height: ${props => props.size};
`;

const Row = styled.div.attrs({ className: 'row' })`
  display: flex;
  height: 12.5%;
  width: 100%;
  .cell {
    background: ${props => props.evenColor};
    .index {
      color: ${props => props.oddColor};
    }
    &:nth-child(2n + 1) {
      background: ${props => props.oddColor};
      .index {
        color: ${props => props.evenColor};
      }
    }
    &:last-child .cell-number {
      visibility: visible !important;
    }
  }

  &:last-child {
    .cell-letter {
      visibility: visible !important;
    }
  }

  &:nth-child(2n + 1) {
    .cell {
      background: ${props => props.oddColor};
      .index {
        color: ${props => props.evenColor};
      }
      &:nth-child(2n + 1) {
        background: ${props => props.evenColor};
        .index {
          color: ${props => props.oddColor};
        }
      }
    }
  }
`;

export { Board, Row };
