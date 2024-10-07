import React from 'react';

const MainScreen = ({ currentQuestion, players, gameState }) => {
  return (
    <div>
      <h2>Main Screen</h2>
      {gameState === 'waiting' && <p>Waiting for players to join...</p>}
      {gameState === 'playing' && (
        <>
          <h3>Question: {currentQuestion.question}</h3>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </>
      )}
      {gameState === 'finished' && <h3>Game Over!</h3>}
      <h3>Players:</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name}: {player.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainScreen;