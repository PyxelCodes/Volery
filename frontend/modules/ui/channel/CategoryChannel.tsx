import Collapsible from "react-collapsible";
import { CategoryChannelHeader } from "./CategoryChannelHeader";

export const CategoryChannel = ({ children, channel }) => {

  return (
    <div className="category">
      <div className="content">
        <Collapsible
          transitionTime={0.1}
          trigger={<CategoryChannelHeader name={channel.name} />}
        >
          {children}
        </Collapsible>
      </div>
    </div>
  );
};
