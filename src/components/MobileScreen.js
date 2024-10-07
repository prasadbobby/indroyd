import React, { useState } from 'react';

const MobileScreen = ({ addPlayer, handleAnswer, currentQuestion, gameState }) => {
  const [playerName, setPlayerName] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    addPlayer(playerName);
    setPlayerName(''); // Clear input after joining
  };

  const handleAnswerSubmit = (answer) => {
    handleAnswer(playerName, answer);
  };

  if (gameState === 'waiting') {
    return (
      <form onSubmit={handleJoin}>
        <input 
          type="text" 
          value={playerName} 
          onChange={(e) => setPlayerName(e.target.value)} 
          placeholder="Enter your name"
        />
        <button type="submit">Join Game</button>
      </form>
    );
  }

  if (gameState === 'playing') {
    return (
      <div>
        <h3>Question: {currentQuestion.question}</h3>
        {currentQuestion.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerSubmit(String.fromCharCode(65 + index))}>
            {option}
          </button>
        ))}
      </div>
    );
  }

  if (gameState === 'finished') {
    return <h3>Game Over! Thank you for playing.</h3>;
  }

  return null;
};

export default MobileScreen;