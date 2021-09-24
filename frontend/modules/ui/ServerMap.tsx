import { useContext } from "react";
import { User } from "../../types/user";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { Community } from "./Community";

export const ServerMap = ({
  activeCId,
  setCommunity,
}: {
  activeCId: string;
  setCommunity: any;
}) => {
  let u = useContext(WebSocketContext);
  return (
    <div className="servermap">
      {u.conn.user.communities.length == 0 ? (
        <p> you&apos;re broke </p>
      ) : (
        <>
          <br />
          {u.conn.user.communities.map((community) => {
            return (
              <Community
                key={`community-${community.id}`}
                c={community}
                isActive={activeCId === community.id}
                setCommunity={setCommunity}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
