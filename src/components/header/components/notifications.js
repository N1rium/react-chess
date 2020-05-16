import React from 'react';
import styled from 'styled-components';
import history from '../../../store/history';

const Wrapper = styled.div`
  max-height: 178px;
  overflow-y: auto;
`;

const Notifications = styled.table`
  td {
    padding: 10px;
  }
`;

export default ({ user, list = [], loading }) => {
  return (
    <Wrapper>
      <Notifications>
        <tbody>
          {!loading && !list.length && <tr>You have no notifications</tr>}
          {!loading &&
            list.map((notification) => <Notification user={user} key={notification.id} notification={notification} />)}
        </tbody>
      </Notifications>
    </Wrapper>
  );
};

const StyledNotification = styled.tr.attrs({ className: 'hover' })``;
const Notification = ({ user, notification }) => {
  const {
    data: { header, id, participants = [] },
    type,
  } = notification;

  const self = participants.find((p) => +p.user.id === +user.id);
  const { winner = false } = self || {};

  return type === 'MATCH_ENDED' ? (
    <StyledNotification onClick={() => history.push(`/match/${id}`)}>
      <td>
        <span>Match ended - {winner ? 'You won $4' : 'You lost $2'}</span>
      </td>
    </StyledNotification>
  ) : (
    <StyledNotification>
      <td>
        <span>{header}</span>
      </td>
    </StyledNotification>
  );
};
