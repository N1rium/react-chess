import styled from 'styled-components';

export default styled.div`
  display: grid;
  padding: 10px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  align-items: ${(props) => props.align || 'initial'};
  justify-content: ${(props) => props.justify || 'initial'};
`;
