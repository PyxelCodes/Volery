import Collapsible from "react-collapsible";
import { CategoryChannelHeader } from "./CategoryChannelHeader";

export const CategoryChannel = ({
  channel,
  children,
}: {
  channel: any;
  children: any;
}) => {
  return (
    <div className="category">
      <div className="content">
        <Collapsible transitionTime={0.1} trigger={<CategoryChannelHeader name={channel.name} />}>
          {children}
        </Collapsible>
      </div>
    </div>
  );
};