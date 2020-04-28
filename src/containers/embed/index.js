import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import qs from 'query-string';
import Chessboard from '../../components/chessboard';

const MATCH_BY_ID = gql`
  query matchById($id: String!) {
    matchById(id: $id) {
      pgn
    }
  }
`;

const Embed = styled.div``;

export default () => {
  const parsed = qs.parse(location.search);
  const { id } = parsed;

  const { data, loading } = useQuery(MATCH_BY_ID, { variables: { id } });

  if (loading) return null;

  return (
    <Embed>
      <Chessboard size={'512px'} pgn={data && data.matchById && data.matchById.pgn} />
    </Embed>
  );
};
