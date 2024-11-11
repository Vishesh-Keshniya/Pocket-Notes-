import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Modal from './Modal';

const Sidebar = ({ onSelectGroup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  const handleCreateGroup = (name, color) => {
    if (groups.some(group => group.name.toLowerCase() === name.toLowerCase())) {
      setErrorMessage('A group with this name already exists.');
      return;
    }

    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newGroup = { name, color, initials, messages: [] };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    closeModal();
  };

  const handleGroupClick = (group) => {
    onSelectGroup(group);
  };

  return (
    <div className="sidebar">
      <div className="head">
        <h1>Pocket Notes</h1>
      </div>
      <button className="add-note-btn" onClick={openModal}>+</button>

      {isModalOpen && <Modal onClose={closeModal} onCreate={handleCreateGroup} errorMessage={errorMessage} />}

      <div className="group-list">
        {groups.map((group, index) => (
          <div key={index} className="group-item" onClick={() => handleGroupClick(group)}>
            <div className="group-icon" style={{ backgroundColor: group.color }}>
              {group.initials}
            </div>
            <span>{group.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
