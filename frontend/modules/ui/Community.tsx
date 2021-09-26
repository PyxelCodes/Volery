import { useContext } from "react";
import { UserStateContext } from "../ws/UserStateProvider";

export const Community = ({ c, isActive }: { c: any; isActive: boolean }) => {
  let context = useContext(UserStateContext);
  let { setCurrentCommunity } = context;
  
  let onClick = () => {
    console.log("switching to guild " + c.id);
    setCurrentCommunity(c);
  };

  if (!c.icon) {
    let simplifiedName = c.name
      .split(" ")
      .map((x) => x.charAt(0))
      .join("");
    return (
      <div className="community-listitem" onClick={onClick}>
        <div className="community">
          <div className="community-noicon-text">
            <p> {simplifiedName} </p>
          </div>
          <div className={`community-flag ${isActive ? "selected" : ""}`} />
        </div>
      </div>
    );
  }
  return (
    <div className="community">
      <div className="community-icon">
        <p> {c.name} </p>
      </div>
    </div>
  );
};
