import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GameMenu from './components/GameMenu';
import GameWorld from './components/GameWorld';
import CharacterCreation from './components/CharacterCreation';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, character, playing
  const [currentScene, setCurrentScene] = useState('intro');

  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <AnimatePresence mode="wait">
            {gameState === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GameMenu onStartGame={() => setGameState('character')} />
              </motion.div>
            )}
            
            {gameState === 'character' && (
              <motion.div
                key="character"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <CharacterCreation onComplete={() => setGameState('playing')} />
              </motion.div>
            )}
            
            {gameState === 'playing' && (
              <motion.div
                key="game"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <GameWorld 
                  currentScene={currentScene}
                  onSceneChange={setCurrentScene}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;