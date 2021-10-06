import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import Home from '../../../modules/renderMainApp';
import channels from '../../../modules/stores/channels';
import { UserStateContext } from '../../../modules/ws/UserStateProvider';

export default function Id() {
  let router = useRouter();
  let { c_id, id } = router.query;

  let { setCurrentCommunity, communities, setCurrentChannel } = useContext(
    UserStateContext
  );

  useEffect(() => {
    let c = communities.find(x => x.id == c_id);
    //channels.dispatch({ type: 'add_channel', payload: c.channels.find(x => x.id == id )})
    setCurrentCommunity(c);
    setCurrentChannel(c.channels.find(x => x.id == id));
  }, [c_id, id]); // eslint-disable-line

  return <Home />;
}
