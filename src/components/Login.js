import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    onLogin(username);
  };

  return (
    <div>
      <h1>Witaj w grze!</h1>
      <input
        type="text"
        placeholder="Wprowadź swoją nazwę gracza"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Zaloguj się</button>
    </div>
  );
};

export default Login;