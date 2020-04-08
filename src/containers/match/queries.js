import gql from 'graphql-tag';

export const GET_MATCH = gql`
  query getMatchById {
    matchById(id: "0") {
      fen
      moves {
        from
        to
        fen
      }
      participants {
        side
      }
    }
  }
`;

export const SEND_MOVE = gql`
  mutation matchMove($input: MatchMoveInput!) {
    matchMove(input: $input) {
      fen
      moves {
        from
        to
        date
        fen
      }
      turn
      gameOver
      draw
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
