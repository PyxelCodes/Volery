import { useState, useEffect, useContext, useRef } from 'react';
import { fetchUser } from '../../stores/users';
import { UserPopoutContext } from '../../ws/UserPopoutContext';

export const UserClickable = () => {
  return null;
  let [loading, setLoading] = useState(true);
  let [user, setUser] = useState(null);
  let [errorText, setErrorText] = useState('');

  let { id, isOpen } = useContext(UserPopoutContext);

  useEffect(() => {
    if (!isOpen) return;
    fetchUser(id)
      .then(u => {
        setUser(u);
        setLoading(false);
      })
      .catch(err => {
        setErrorText(err.message);
        setLoading(false);
      });
  }, [id, isOpen]);

  let container = useRef(null);

  if (!isOpen) return null;

 // console.dir(container.current.clientLeft);

  return (
    <div
      className="userpopout"
      style={{
        position: 'absolute',
      }}
      ref={container}
    >
      {loading ? (
        <h2> loading </h2>
      ) : errorText ? (
        <h2> request failed </h2>
      ) : (
        <>
          <h2> yes </h2>
        </>
      )}
    </div>
  );
};
