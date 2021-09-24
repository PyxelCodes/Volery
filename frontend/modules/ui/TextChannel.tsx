export const TextChannel = ({
  channel,
  setChannel,
}: {
  channel: any;
  setChannel: any;
}) => {
  let clickManager = () => {
    setChannel(channel);
  };
  return (
    <div className="channel">
      <div className="marker" />
      <div className="content">
        <div className="linkmanager" onClick={clickManager}>
          <span className="icon" />
          <div className="name">{channel.name}</div>
        </div>
      </div>
    </div>
  );
};
