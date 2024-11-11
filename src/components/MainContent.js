import React, { useState, useEffect, useRef } from 'react';
import './MainContent.css';
import MyImage from '../Images/illu.png';
import SubmitIcon from '../Images/submit.png';
import DisabledSubmitIcon from '../Images/grey.png';

const MainContent = ({ selectedGroup, addMessageToGroup }) => {
  const [newMessage, setNewMessage] = useState(localStorage.getItem(`${selectedGroup?.name}_newMessage`) || '');
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem(selectedGroup?.name);
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [isMessageCreated, setIsMessageCreated] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedGroup) {
      const storedMessages = localStorage.getItem(selectedGroup?.name);
      setMessages(storedMessages ? JSON.parse(storedMessages) : []);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem(selectedGroup?.name, JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages, selectedGroup]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
    localStorage.setItem(`${selectedGroup?.name}_newMessage`, event.target.value);
  };

  const handleSubmit = () => {
    if (newMessage.trim()) {
      const newMessageData = {
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      const updatedMessages = [...messages, newMessageData];
      setMessages(updatedMessages);
      setNewMessage('');
      localStorage.removeItem(`${selectedGroup?.name}_newMessage`);

      if (!isMessageCreated) {
        setIsMessageCreated(true);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="main-content">
      {selectedGroup ? (
        <>
          <div className="group-header">
            <div className="group-icon" style={{ backgroundColor: selectedGroup.color }}>
              {selectedGroup.initials}
            </div>
            <h2>{selectedGroup.name}</h2>
          </div>

          <div className="notes-list">
            {messages.map((message, index) => (
              <div key={index} className="note">
                <p>{message.text}</p>
                <span className="date">
                  {formatDate(new Date(message.timestamp))} • {formatTime(new Date(message.timestamp))}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="note-input">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={isMessageCreated ? "Here’s the sample text for sample work" : "Enter your text here..........."}
            />
            <button
              onClick={handleSubmit}
              disabled={!newMessage.trim()}
              className={!newMessage.trim() ? 'disabled' : ''}
            >
              <img
                src={!newMessage.trim() ? DisabledSubmitIcon : SubmitIcon}
                alt="Submit"
                className="icon"
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <img src={MyImage} alt="Illustration" className="illustration" />
          <h2>Pocket Notes</h2>
          <p>
            Send and receive messages without keeping your phone online. <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
          <footer className="footer">
            <span>🔒 end-to-end encrypted</span>
          </footer>
        </>
      )}
    </div>
  );
};

export default MainContent;
