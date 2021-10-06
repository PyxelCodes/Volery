import { useContext, useEffect } from 'react';
import { UserStateContext } from '../../ws/UserStateProvider';
import { WebSocketContext } from '../../ws/WebSocketProvider';
import { Community } from './Community';
import { CreateCommunity } from './CreateCommunity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link'

export const ServerMap = () => {
  let context = useContext(UserStateContext);
  let wsContext = useContext(WebSocketContext);

  useEffect(() => {
    let onComunityCreate = c => {
      context.setCommunities(old => [...old, c]);
    };

    wsContext.conn.on('COMMUNITY_CREATE', onComunityCreate);

    return () => {
      wsContext.conn.off('COMMUNITY_CREATE', onComunityCreate);
    };
  }, [context, wsContext.conn]);

  return (
    <div className="servermap">
      <div className="community-listitem">
        <Link href="/channels/me" passHref>
        <div className="community">
          <div className="community-noicon-text">
            <FavoriteIcon />
          </div>
        </div>
        </Link>
      </div>
      <hr />
      {context.communities.length == 0 ? (
        <></>
      ) : (
        <>
          <br />
          {context.communities.map(community => {
            return (
              <Community
                key={`community-${community.id}`}
                c={community}
                isActive={context.currentCommunity?.id === community.id}
              />
            );
          })}
        </>
      )}
      <CreateCommunity />
    </div>
  );
};
