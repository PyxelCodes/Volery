import { User } from "../../types/user";
import { ServerMap } from "./ServerMap";

export const Serverbar = ({
  activeCId,
  setCommunity,
}: {
  activeCId: string;
  setCommunity: any;
}) => {
  return (
    <div className="serverbar">
      <ServerMap activeCId={activeCId} setCommunity={setCommunity} />
    </div>
  );
};
