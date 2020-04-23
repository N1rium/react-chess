import React from 'react';
import history from '../../../store/history';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const MY_ONGOING_MATCHES = gql`
  query myOngoingMatches {
    myOngoingMatches {
      id
    }
  }
`;

const MyMatches = styled.section`
  grid-area: ongoing;
`;

export default () => {
  const { data: ongoing, loading } = useQuery(MY_ONGOING_MATCHES);
  return (
    <MyMatches>
      <header>Ongoing</header>
      {!loading && (
        <table className="zebra">
          <tbody>
            {ongoing.myOngoingMatches.map((match) => (
              <tr key={match.id} onClick={() => history.push(`/match/${match.id}`)}>
                <td>
                  <span>{match.id}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </MyMatches>
  );
};
