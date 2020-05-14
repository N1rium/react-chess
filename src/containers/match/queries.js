import gql from 'graphql-tag';

const matchFragment = `
  fen
  turn
  pgn
  gameOver
  draw
  threefold
  checkmate
  stalemate
  timedout
  timeControl
  type
  rated
  participants {
    side
    pendingTimeoutDate
    time
    winner
    user {
      id
      username
    }
  }
`;

export const GET_MATCH = gql`
  query getMatchById($id: String!) {
    matchById(id: $id) {
      ${matchFragment}
    }
    me {
      id
      username
    }
  }
`;

export const SEND_MOVE = gql`
  mutation matchMove($input: MatchMoveInput!) {
    matchMove(input: $input) {
      ${matchFragment}
    }
  }
`;

export const SEND_CHAT_MESSAGE = gql`
  mutation sendChatMessage($input: ChatMessageInput!) {
    sendChatMessage(input: $input) {
      sender
      content
    }
  }
`;

export const MOVE_SUBSCRIPTION = gql`
  subscription matchMoveMade($id: String!) {
    matchMoveMade(id: $id) {
      ${matchFragment}
    }
  }
`;

export const CHAT_SUBSCRIPTION = gql`
  subscription chatMessage($room: String!) {
    chatMessage(room: $room) {
      sender
      content
    }
  }
`;

export const FORFEIT = gql`
  mutation forfeit($matchId: String!) {
    forfeit(matchId: $matchId) {
      ${matchFragment}
    }
  }
`;
