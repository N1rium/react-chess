import styled from 'styled-components';
export default styled.div`
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  justify-content: ${(props) => props.justify || 'initial'};
  align-items: ${(props) => props.align || 'initial'};
  flex: ${(props) => props.flex || 'initial'};
  flex-direction: ${(props) => props.direction || 'initial'};
`;
