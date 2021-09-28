import { useContext } from "react";
import { UserStateContext } from "../../ws/UserStateProvider";

export const CommunityInfo = () => {
  let { currentCommunity } = useContext(UserStateContext);

  return (
    <div className="community-info">
      <header>
        <h2 className="name"> {currentCommunity.name} </h2>
      </header>
      <div className="dropdown-icon"></div>
    </div>
  );
};
