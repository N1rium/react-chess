import React from 'react';
import history from '../../../store/history';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';
import GameModeIcon from '../../../components/gamemode-icon';

const MY_FINISHED_MATCHES = gql`
  query myFinishedMatches {
    myFinishedMatches {
      id
      updatedDate
      rated
      type
      self {
        eloChange
        user {
          username
        }
      }
      opponent {
        user {
          username
        }
      }
    }
  }
`;

const MyMatches = styled.section`
  grid-area: finished;
`;

export default () => {
  const { data: finished, loading } = useQuery(MY_FINISHED_MATCHES, { fetchPolicy: 'cache-and-network' });
  console.log(finished && finished.myFinishedMatches && finished.myFinishedMatches.length);
  return (
    <MyMatches>
      <header>Latest matches</header>
      <main>
        {!loading && (
          <table className="zebra">
            <tbody>
              {finished &&
                finished.myFinishedMatches.map((match) => (
                  <MatchRow key={match.id} match={match} onClick={() => history.push(`/match/${match.id}`)} />
                ))}
            </tbody>
          </table>
        )}
      </main>
    </MyMatches>
  );
};

const MatchRow = ({ match, onClick }) => {
  console.log(match);
  const { self, opponent, updatedDate, rated, type } = match;
  const { winner, eloChange } = self;
  const {
    user: { username },
  } = opponent;
  return (
    <tr className="hover" onClick={onClick}>
      <td className="center">
        <GameModeIcon mode={type} />
      </td>
      <td>
        <span>Yesterday</span>
      </td>
      <td>
        <span>{username}</span>
      </td>
      <td className="center">
        <span>{eloChange}</span>
      </td>
      <td className="center">
        <span>{rated ? 'Rated' : 'Casual'}</span>
      </td>
    </tr>
  );
};
