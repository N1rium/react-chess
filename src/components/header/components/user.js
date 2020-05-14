import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import history from '../../../store/history';
import Flex from 'Components/styled/flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faUser, faSignOutAlt, faWallet } from '@fortawesome/free-solid-svg-icons';

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
  const [wallet, setWallet] = useState(null);

  const signOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const fetchGlootWallet = async () => {
    const resp = await fetch('https://default-service-dot-youbet-dev.appspot.com/api/v1/wallet', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.glootToken}`,
      },
    });

    try {
      const data = await resp.json();
      setWallet(data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchGlootWallet();
  }, []);

  return (
    <User>
      <table>
        <tbody>
          {wallet && (
            <Cell>
              <Icon>
                <FontAwesomeIcon icon={faWallet} />
              </Icon>
              <td>
                <span>
                  {wallet.available.amount} {wallet.available.currency}
                </span>
              </td>
            </Cell>
          )}
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
