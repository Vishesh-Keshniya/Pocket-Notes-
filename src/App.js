import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

const App = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const addMessageToGroup = (message) => {
    setSelectedGroup(prevGroup => {
      // Check if `prevGroup` and `prevGroup.messages` are defined
      if (prevGroup && prevGroup.messages) {
        return {
          ...prevGroup,
          messages: [...prevGroup.messages, { text: message, timestamp: new Date() }]
        };
      }
      return prevGroup; // Return the previous group unchanged if it’s not defined
    });
  };

  return (
    <div className="app">
      <Sidebar onSelectGroup={handleSelectGroup} />
      <MainContent selectedGroup={selectedGroup} addMessageToGroup={addMessageToGroup} />
    </div>
  );
};

export default App;
