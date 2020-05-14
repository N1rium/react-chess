import React from 'react';
import styled from 'styled-components';

const Notifications = styled.div`
  padding: 10px;
`;

export default ({ list = [], loading }) => {
  return (
    <Notifications>
      {!loading && !list.length && <span>You have no notifications</span>}
      {!loading && list.map((notification) => <Notification key={notification.id} notification={notification} />)}
    </Notifications>
  );
};

const StyledNotification = styled.div``;
const Notification = ({ notification }) => {
  const {
    data: { header },
  } = notification;
  return <StyledNotification>{header}</StyledNotification>;
};
