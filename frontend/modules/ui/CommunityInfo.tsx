export const CommunityInfo = ({ c }: { c: any }) => {
  return (
    <div className="community-info">
      <header>
        <h2 className="name"> {c.name} </h2>
      </header>
      <div className="dropdown-icon"></div>
    </div>
  );
};
