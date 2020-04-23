import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import history from '../../../../store/history';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt, faTrash, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

import {
  ME,
  GET_MATCH_INVITES,
  CREATE_MATCH,
  CREATE_MATCH_INVITE,
  MATCH_INVITE_SUBSCRIPTION,
  DELETE_MATCH_INVITE,
} from './queries';

const Play = styled.section`
  grid-area: lobbies;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  main {
    display: flex;
    flex-direction: column;
    & > div {
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  }
`;

const Title = styled.div``;
const Add = styled.div.attrs({ className: 'hover-btn', 'aria-label': 'I am red!', 'data-balloon-pos': 'down' })`
  padding: 0px 10px;
  height: 100%;
  font-size: 1.2rem;
`;

const ControlButttons = styled.div`
  display: flex;
  align-items: center;
`;

export default ({}) => {
  const [getMatchInvites, { data, loading }] = useLazyQuery(GET_MATCH_INVITES, { fetchPolicy: 'network-only' });
  const [createMatchInvite] = useMutation(CREATE_MATCH_INVITE);
  const [createMatch] = useMutation(CREATE_MATCH);
  const [deleteMyInvite] = useMutation(DELETE_MATCH_INVITE);
  const [matchInvites, setMatchInvites] = useState([]);
  const { data: subData } = useSubscription(MATCH_INVITE_SUBSCRIPTION);
  const { data: me } = useQuery(ME);

  useEffect(() => {
    getMatchInvites();
    return () => {
      deleteMyInvite();
    };
  }, []);

  useEffect(() => {
    if (subData) {
      const {
        matchInvite: { invite, deleted },
      } = subData;
      const invites = [...matchInvites];
      if (!deleted) setMatchInvites([...invites, invite]);
      if (deleted) setMatchInvites([...invites].filter(i => i.id != invite.id));
    }
  }, [subData]);

  useEffect(() => {
    if (data) {
      setMatchInvites(data.matchInvites);
    }
  }, [data]);

  const createMatchAndJoin = async invite => {
    const {
      creator: { id },
    } = invite;

    const {
      data: {
        createMatch: { id: matchId },
      },
    } = await createMatch({ variables: { input: { opponent: id } } });

    history.push(`/match/${matchId}`);
  };

  return (
    <Play>
      <header>
        <Title>
          <header>Open lobbies</header>
        </Title>
        <ControlButttons>
          <Add onClick={createMatchInvite}>
            <FontAwesomeIcon icon={faPlus} />
          </Add>
          <Add onClick={getMatchInvites}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </Add>
        </ControlButttons>
      </header>
      <main>
        <div>
          {!matchInvites.length && <span>No lobbies</span>}
          {matchInvites.length > 0 && (
            <table className="zebra">
              <tbody>
                {matchInvites.map(matchInvite => (
                  <MatchCell
                    key={matchInvite.id}
                    self={me && me.me.id == matchInvite.creator.id}
                    matchInvite={matchInvite}
                    onClick={() => createMatchAndJoin(matchInvite)}
                    onDelete={deleteMyInvite}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </Play>
  );
};

const HoverBtn = styled.div.attrs({ className: 'hover-btn' })``;

const MatchCell = ({ matchInvite, onClick, onDelete, self = false }) => {
  const {
    creator: { username },
  } = matchInvite;
  return (
    <tr>
      <td>{username}</td>
      <td className="right">
        {!self && (
          <HoverBtn onClick={onClick}>
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </HoverBtn>
        )}
        {self && (
          <HoverBtn onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </HoverBtn>
        )}
      </td>
    </tr>
  );
};
