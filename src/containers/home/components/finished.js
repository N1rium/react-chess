import React from 'react';
import history from '../../../store/history';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';

const MY_FINISHED_MATCHES = gql`
  query myFinishedMatches {
    myFinishedMatches {
      id
    }
  }
`;

const MyMatches = styled.section`
  grid-area: finished;
`;

export default () => {
  const { data: finished, loading } = useQuery(MY_FINISHED_MATCHES);
  return (
    <MyMatches>
      <header>Finished</header>
      {!loading && (
        <table className="zebra">
          <tbody>
            {finished.myFinishedMatches.map((match) => (
              <tr className="hover" key={match.id} onClick={() => history.push(`/match/${match.id}`)}>
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
