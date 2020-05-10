import React, { useState, useRef, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Flex from 'Components/styled/flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Friends = styled.section`
  grid-area: friends;
`;

const Header = styled(Flex).attrs({
  as: 'header',
  align: 'center',
  justify: 'space-between',
})``;

export default ({}) => {
  return (
    <Friends>
      <Header>
        <div>Friends</div>
        <SearchInput />
      </Header>
      <main></main>
    </Friends>
  );
};

const Search = styled(Flex).attrs({ align: 'center' })``;
const Icon = styled.div.attrs({ className: 'hover-btn' })``;
const Input = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: 'Search',
  className: `${props.active ? 'active' : 'inactive'}`,
}))`
  background: none;
  color: ${(props) => props.theme.primaryTextColor};
  width: 0;
  padding: 0;
  margin-left: 10px;
  transform: scaleX(0);
  transition: all 0.225s ease-in-out;
  will-change: transform;
  &.active {
    width: auto;
    transform: scaleX(1);
  }
`;
const SearchInput = ({ onChange }) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);
  const node = useRef(null);
  const inputRef = useRef(null);

  const change = (e) => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  const clickListener = (e) => {
    if (node.current.contains(e.target)) return;
    setActive(false);
  };

  useEffect(() => {
    window.addEventListener('click', clickListener);
    window.addEventListener('touchstart', clickListener);
    return () => {
      window.removeEventListener('click', clickListener);
      window.removeEventListener('touchstart', clickListener);
    };
  }, []);

  return (
    <Search ref={node}>
      <Icon
        onClick={() => {
          setActive(true);
          inputRef.current.focus();
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Icon>
      <Input ref={inputRef} active={active} value={value} onChange={change} />
    </Search>
  );
};
