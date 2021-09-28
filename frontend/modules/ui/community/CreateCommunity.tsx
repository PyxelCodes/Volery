import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-modal';
import { useState } from 'react';

export const CreateCommunity = () => {
  let [isOpen, setOpen] = useState(false);

  let onClick = () => {
    setOpen(true);
  };

  let closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="createCommunity">
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div className="modal">
        <h1>Create your community</h1>
        <p>A community is a cozy place made just for you, your friends, and fans.</p>
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
