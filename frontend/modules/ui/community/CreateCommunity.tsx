import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-modal';
import { useState, useContext } from 'react';
import { Formik } from 'formik';
import { UserStateContext } from '../../ws/UserStateProvider';
import { Input } from '../lib/Input';
import { APIRequest } from '../../fetch/APIRequest';

export const CreateCommunity = () => {
  let [isOpen, setOpen] = useState(false);
  let { user, setCurrentCommunity, setCurrentChannel } = useContext(UserStateContext);

  let onClick = () => {
    setOpen(true);
  };

  let closeModal = () => {
    setOpen(false);
  };

  let createModalStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.75)',
    },
    content: {
      marginLeft: '30%',
      marginTop: '10%',
      width: '40%',
      height: '60%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#272626',
      color: '#d8dee9',
      border: 'none',
    },
  };

  return (
    <div className="createCommunity">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={createModalStyles}
        closeTimeoutMS={200}
      >
        <div className="modal">
          <div className="create-community-header">
            <h3>Create your community</h3>
            <p>
              A community is a cozy place made just for you, your friends, and
              fans.
            </p>
          </div>
          <div className="create-community-content">
            <p> Community Name </p>
            <Input
              id="create-community-input"
              placeholder={`${user.username}'${
                user.username.endsWith('s') ? '' : 's'
              } community`}
              onSubmit={(value) => {
                APIRequest('/communities', { method: 'POST', body: { name: value } })
                .then(x => {
                  closeModal();
                  setCurrentCommunity(x)
                  setCurrentChannel(x.channels.find(x => x.type == 2)) // only use text channels lol
                })
              }}
            />
          </div>
        </div>
      </Modal>
      <div className="community-listitem" onClick={onClick}>
        <div className="community">
          <div className="community-noicon-text">
            <AddIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
