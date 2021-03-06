import { useContext } from 'react';
import { UserStateContext } from '../ws/UserStateProvider';
import { RoleMemberMap } from './RoleMemberMap';

export const MemberList = () => {
  let { currentCommunity } = useContext(UserStateContext);

  let memberListObjectWithRoles: any = { online: [] };

  let cRoles = {};
  for (let x in currentCommunity.roles) {
    cRoles[currentCommunity.roles[x].id] = currentCommunity.roles[x];
  }

  for (let x in currentCommunity.members) {
    let member = currentCommunity.members[x];
    let roles = member.roles.map(x => cRoles[x]);
    let hoistedRole = null;
    for (let x in roles) {
      if (roles[x].hoist) {
        hoistedRole = roles[x];
        break;
      }
    }

    if (hoistedRole) {
      if (memberListObjectWithRoles[hoistedRole.id])
        memberListObjectWithRoles[hoistedRole.id].push(member);
      else memberListObjectWithRoles[hoistedRole.id] = [member];
    } else {
      memberListObjectWithRoles.online.push(member);
    }
  }

  return (
    <aside className="membersWrapper">
      <div className="members">
        <div className="content">
          {
            memberListObjectWithRoles.online?.map(x => {
              return <RoleMemberMap key={`member-${x.id}`} role="online" roleObj={x} />
            })
          }
          <div />
        </div>
      </div>
    </aside>
  );
};
