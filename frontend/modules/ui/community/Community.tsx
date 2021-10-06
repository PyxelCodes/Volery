import Link from 'next/link'

export const Community = ({ c, isActive }: { c: any; isActive: boolean }) => {
  if (!c.icon) {
    let simplifiedName = c.name
      .split(" ")
      .map((x) => x.charAt(0))
      .join("");
    return (
      <div className="community-listitem">
        <Link href={`/channels/${c.id}/${c.channels[0].id}`} passHref>
        <div className="community">
          <div className="community-noicon-text">
            <p> {simplifiedName} </p>
          </div>
          <div className={`community-flag ${isActive ? "selected" : ""}`} />
        </div>
        </Link>
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
