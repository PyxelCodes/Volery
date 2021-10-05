import { useContext, useEffect } from 'react';
import { UserStateContext } from '../../ws/UserStateProvider';
import { WebSocketContext } from '../../ws/WebSocketProvider';
import { Community } from './Community';
import { CreateCommunity } from './CreateCommunity';

export const ServerMap = () => {
  let context = useContext(UserStateContext);
  let wsContext = useContext(WebSocketContext);

  useEffect(() => {
    let onComunityCreate = c => {
      console.log(c);
      context.setCommunities(old => [...old, c]);
    };

    wsContext.conn.on('COMMUNITY_CREATE', onComunityCreate);

    return () => {
      wsContext.conn.off('COMMUNITY_CREATE', onComunityCreate);
    };
  }, [context, wsContext.conn]);

  return (
    <div className="servermap">
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
