import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import StyledGrid from 'Components/styled/grid';
import Flex from 'Components/styled/flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Chessboard from 'Components/chessboard';

const GET_PROFILE = gql`
  query userById($id: String!) {
    userById(id: $id) {
      id
      username
    }
    finishedMatches(id: $id) {
      id
      pgn
    }
  }
`;

const Profile = styled.div``;
const Grid = styled(StyledGrid).attrs({ align: 'stretch', justify: 'stretch' })`
  grid-template-areas:
    'info'
    'info';
  grid-template-columns: auto;
  grid-template-rows: auto;
`;

const Info = styled.div`
  grid-area: info;
`;

const ButtonGroup = styled(Flex).attrs({ align: 'center', justify: 'center' })`
  button {
    margin: 0px 5px;
    span {
      margin-left: 5px;
    }
  }
`;

const Matches = styled(Flex)`
  flex-wrap: wrap;
`;

const ChessboardWrapper = styled.div`
  width: 192px;
  height: 192px;
`;

const InfoGrid = styled(Grid).attrs({ align: 'stretch', justify: 'stretch' })`
  grid-template-areas: 'player-info last-match';
  grid-template-columns: 75% 25%;
`;

const PlayerInfo = styled.section`
  grid-area: player-info;
`;

const LastMatch = styled.section`
  grid-area: last-match;
`;

export default ({ id }) => {
  const { data, loading } = useQuery(GET_PROFILE, { variables: { id } });
  if (loading) return null;

  const {
    userById: { username },
    finishedMatches = [],
  } = data;

  return (
    <Profile>
      <Grid>
        <Info>
          <Flex align="center" justify="space-between">
            <h1>{username}</h1>
            <ButtonGroup>
              <button>
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Add</span>
              </button>
              <button>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>Follow</span>
              </button>
            </ButtonGroup>
          </Flex>
          <InfoGrid>
            <PlayerInfo>
              <header>Info</header>
            </PlayerInfo>
            <LastMatch>
              <header>Last match</header>
              <main>
                {finishedMatches.length > 0 && (
                  <ChessboardWrapper>
                    <Chessboard pgn={finishedMatches[0].pgn} />
                  </ChessboardWrapper>
                )}
              </main>
            </LastMatch>
          </InfoGrid>
          <section>
            <header>Matches played</header>
            <Matches>
              {finishedMatches.map((match) => (
                <ChessboardWrapper key={match.id}>{/* <Chessboard pgn={match.pgn} /> */}</ChessboardWrapper>
              ))}
            </Matches>
          </section>
        </Info>
      </Grid>
    </Profile>
  );
};
