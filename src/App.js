import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Change to QRCodeSVG if you prefer SVG
import MainScreen from './components/MainScreen';
import MobileScreen from './components/MobileScreen';
import questions from './data/questions';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'finished'

  const addPlayer = (name) => {
    setPlayers([...players, { name, score: 0 }]);
  };

  const handleAnswer = (playerName, answer) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setPlayers(players.map(player => 
        player.name === playerName ? { ...player, score: player.score + 1 } : player
      ));
      setCurrentQuestion(currentQuestion + 1);
      if (currentQuestion + 1 >= questions.length) {
        setGameState('finished');
      }
    }
  };

  useEffect(() => {
    if (players.length > 0 && gameState === 'waiting') {
      setGameState('playing');
    }
  }, [players, gameState]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Scan to join the game</h1>
            <QRCodeCanvas value={`${window.location.origin}/mobile`} />
            <MainScreen 
              currentQuestion={questions[currentQuestion]}
              players={players}
              gameState={gameState}
            />
          </div>
        } />
        <Route path="/mobile" element={
          <MobileScreen 
            addPlayer={addPlayer}
            handleAnswer={handleAnswer}
            currentQuestion={questions[currentQuestion]}
            gameState={gameState}
          />
        } />
      </Routes>
    </Router>
  );
};

export default App;
