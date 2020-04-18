import React, { useEffect } from 'react';
import history from '../../../store/history';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CREATE_MATCH = gql`
  mutation createMatch {
    createMatch {
      id
    }
  }
`;

const GET_MATCHES = gql`
  query availableMatches {
    availableMatches {
      id
      turn
      participants {
        side
        user {
          username
        }
      }
    }
  }
`;

const Play = styled.section`
  grid-area: play;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Title = styled.div``;
const Add = styled.div.attrs({ className: 'hover-btn' })`
  padding: 0px 10px;
  height: 100%;
  font-size: 1.2em;
`;

export default ({}) => {
  const [getMatches, { data, loading, error }] = useLazyQuery(GET_MATCHES);
  const [createMatch] = useMutation(CREATE_MATCH);

  useEffect(() => {
    getMatches();
  }, []);

  const create = async () => {
    const {
      data: {
        createMatch: { id },
      },
    } = await createMatch();
    history.push(`/match/${id}`);
  };

  return (
    <Play>
      <header>
        <Title>Play</Title>
        <Add onClick={create}>
          <FontAwesomeIcon icon={faPlus} />
        </Add>
      </header>
      <main>
        {data && data.availableMatches.length > 0 && (
          <table>
            <tbody>
              {data.availableMatches.map(match => (
                <tr onClick={() => history.push(`/match/${match.id}`)} key={match.id}>
                  <td>{match.participants.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </Play>
  );
};
