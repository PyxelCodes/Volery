import { useContext } from 'react';
import { UserStateContext } from '../../ws/UserStateProvider';
import { Community } from './Community';
import { CreateCommunity } from './CreateCommunity';

export const ServerMap = () => {
  let context = useContext(UserStateContext);
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
