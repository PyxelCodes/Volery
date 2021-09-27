import { useContext } from 'react';
import { UserStateContext } from '../ws/UserStateProvider';

export const MemberList = () => {
  let { currentCommunity } = useContext(UserStateContext);

  let memberListObjectWithRoles = {};

  for (let x in currentCommunity.members) {
    let member = currentCommunity.members[x];
    console.log(member);
  }

  return (
    <aside className="membersWrapper">
      <div className="members">
        <div className="content">
          <div />
        </div>
      </div>
    </aside>
  );
};
