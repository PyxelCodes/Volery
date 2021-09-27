import { ArrowSvg } from "../../svgs/arrow";

export const CategoryChannelHeader = ({ name }: { name: string }) => {
  return (
    <div className="categoryheader">
      <div className="openicon">
        <ArrowSvg />
      </div>
      <h2 className="text">
        <div className="innerText"> {name} </div>
      </h2>
    </div>
  );
};
