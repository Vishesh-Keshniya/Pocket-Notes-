import React, { useState, useEffect, useCallback } from 'react';
import './Modal.css';

const Modal = ({ onClose, onCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleCreate = useCallback(() => {
    if (groupName && selectedColor) {
      onCreate(groupName, selectedColor);
      onClose();
    }
  }, [groupName, selectedColor, onCreate, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      if (groupName && selectedColor) {
        handleCreate();
      } else if (!groupName && !selectedColor) {
        onClose();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleCreate();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleCreate]);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h3>Create New Group</h3>
        
        <div className="group-name-container">
          <label htmlFor="group-name">Group Name</label>
          <input
            type="text"
            id="group-name"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        
        <div className="color-container">
          <label>Choose Color</label>
          <div className="color-options">
            {['#6366F1', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'].map((color) => (
              <div
                key={color}
                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
        </div>
        
        <button className="create-btn" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
};

export default Modal;
