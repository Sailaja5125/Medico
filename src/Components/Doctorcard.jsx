import React, { useState } from 'react';
import '../Style/Doctorcard.css';
import Mailto from './Mailto';
import Chat from './Chat'; // Import the Chat component

export default function Doctorcard({ doctor }) {
  // State to manage modal visibility
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Function to handle opening the chat modal
  const handleConnectClick = () => {
    setIsChatOpen(true);
  };

  // Function to handle closing the chat modal
  const handleCloseModal = () => {
    setIsChatOpen(false);
  };

  return (
    <div>
      <div className="card-container">
        <div className="card-image">
          <img
            src={doctor.avatar}
            alt="Doctor Image"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <div className="card-content">
          <h4>Dr.{doctor.username}</h4>
          <p>{doctor.occupation}</p>
          <p>15+ years of experience</p>
          <button onClick={handleConnectClick}>Connect</button>
          <div className="icons-doc">
            <Mailto email={doctor.email}>
              <i className="fa-solid fa-envelope"></i>
            </Mailto>
          </div>
        </div>
      </div>


      {isChatOpen && (
            <Chat close={handleCloseModal}/>  
      )}
    </div>
  );
}
