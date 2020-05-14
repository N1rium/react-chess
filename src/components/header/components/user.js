import React from 'react';
import styled from 'styled-components';
import history from '../../../store/history';
import Flex from 'Components/styled/flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const User = styled.div``;
const Cell = styled.tr.attrs({ className: 'hover' })`
  cursor: pointer;
  td {
    padding: 10px;
  }
`;
const Chevron = styled.div`
  svg {
    font-size: 1rem !important;
  }
`;

const Icon = styled.td`
  margin-right: 10px;
  svg {
    font-size: 1rem !important;
  }
`;

export default ({ user, clickHandler }) => {
  const signOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <User>
      <table>
        <tbody>
          <Cell
            onClick={(e) => {
              clickHandler(e);
              history.push(`/profile/${user.id}`);
            }}
          >
            <Icon>
              <FontAwesomeIcon icon={faUser} />
            </Icon>
            <td>
              <span>Profile</span>
            </td>
          </Cell>
          <Cell onClick={signOut}>
            <Icon>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Icon>
            <td>
              <span>Sign out</span>
            </td>
          </Cell>
        </tbody>
      </table>
    </User>
  );
};
