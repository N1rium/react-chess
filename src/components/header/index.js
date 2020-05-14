import React, { useState, useEffect, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import history from '../../store/history';
import styled from 'styled-components';
import Flex from 'Components/styled/flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight, faBell } from '@fortawesome/free-solid-svg-icons';
import Notifications from './components/notifications';
import User from './components/user';

const NOTIFICATIONS = gql`
  query header {
    myNotifications {
      id
      read
      data
    }
    me {
      id
      username
    }
  }
`;

const Header = styled(Flex).attrs({ as: 'header', align: 'center', justify: 'space-between' })`
  width: 100%;
  height: 48px;
  background: #232323;
  font-weight: bold;
  padding: 0 20px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.24);
  svg {
    font-size: 1.5rem;
  }
  & > * {
    height: 100%;
  }
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
  margin-left: 0.5em;
  font-weight: 900;
  text-decoration: underline;
  span {
    font-weight: normal;
    font-size: 0.6rem;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 48px;
  z-index: 2;
  right: 0;
  width: 320px;
  background: #353535;
  box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.24);
`;

const BellContainer = styled(Flex).attrs((props) => ({
  align: 'center',
  className: `${props.active ? 'active' : 'non-active'}`,
}))`
  height: 100%;
  &.active {
    background: #353535;
  }
`;

const UserContainer = styled(Flex).attrs((props) => ({
  align: 'center',
  className: `${props.active ? 'active' : 'non-active'}`,
}))`
  height: 100%;
  padding: 0px 20px;
  &.active {
    background: #353535;
  }
`;

const Bell = styled(Flex).attrs((props) => ({ align: 'center', className: props.active ? '' : `hover-btn` }))`
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  svg {
    font-size: 1rem;
  }
`;

const RightSegment = styled(Flex).attrs({ align: 'center' })`
  & > * {
    margin: 0px 5px;
  }
`;

export default ({}) => {
  const { data, loading } = useQuery(NOTIFICATIONS);
  const [state, setState] = useState(false);
  const notificationNode = useRef(null);
  const userNode = useRef(null);

  const clickListener = (e) => {
    if (e != null) {
      if (notificationNode.current.contains(e.target)) return;
      if (userNode.current.contains(e.target)) return;
    }
    setState(null);
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
    <Header>
      <Flex align="center">
        <FontAwesomeIcon icon={faChessKnight} />
        <Title onClick={() => history.push('/')}>
          Chessports
          {/* <span>.com</span> */}
        </Title>
      </Flex>
      <RightSegment>
        <BellContainer
          active={state === 'notifications'}
          ref={notificationNode}
          onClick={() => setState('notifications')}
        >
          <Bell active={state === 'notifications'}>
            <FontAwesomeIcon icon={faBell} />
          </Bell>
          {state === 'notifications' && (
            <NotificationContainer>
              <Notifications list={data && data.myNotifications} loading={loading} />
            </NotificationContainer>
          )}
        </BellContainer>
        <UserContainer active={state === 'user'} ref={userNode} onClick={() => setState('user')}>
          <span className="hover-btn">{data && data.me.username}</span>
          {state === 'user' && (
            <NotificationContainer>
              <User
                user={data.me}
                clickHandler={(e) => {
                  clickListener(null);
                  e.stopPropagation();
                }}
              />
            </NotificationContainer>
          )}
        </UserContainer>
      </RightSegment>
    </Header>
  );
};
