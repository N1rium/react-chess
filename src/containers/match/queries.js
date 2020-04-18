import gql from 'graphql-tag';

export const GET_MATCH = gql`
  query getMatchById($id: String!) {
    matchById(id: $id) {
      fen
      turn
      pgn
      gameOver
      draw
      threefold
      checkmate
      stalemate
      moves {
        from
        to
        fen
      }
      participants {
        side
        user {
          id
          username
        }
      }
      captured
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
      fen
      turn
      pgn
      gameOver
      draw
      threefold
      checkmate
      stalemate
      moves {
        from
        to
        fen
      }
      participants {
        side
        user {
          username
          id
        }
      }
      captured
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
      fen
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
