import React from 'react';
import './App.css';
import Game from './components/Game';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';

function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Game />
      </Box>
    </>
  );
}

export default App;
