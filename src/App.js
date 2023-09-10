import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import ConnectedGame from './components/Game';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';


const App = () => {
  const [username, setUsername] = useState(null);

  const handleLogin = (username) => {
    setUsername(username);
  };

  return (
    <><Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        {username ? (
          <ConnectedGame username={username} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </Box>
    </>
  );
};
export default App;