import gql from 'graphql-tag';

export const GET_MATCH = gql`
  query getMatchById($id: String!) {
    matchById(id: $id) {
      fen
      turn
      pgn
      moves {
        from
        to
        fen
      }
      participants {
        user {
          username
        }
      }
      captured
    }
  }
`;

export const SEND_MOVE = gql`
  mutation matchMove($input: MatchMoveInput!) {
    matchMove(input: $input) {
      fen
      pgn
      moves {
        from
        to
        fen
      }
      participants {
        user {
          username
        }
      }
      turn
      gameOver
      draw
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
