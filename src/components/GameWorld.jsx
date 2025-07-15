import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PlayerStats from './PlayerStats';
import SceneRenderer from './SceneRenderer';
import DialogueSystem from './DialogueSystem';
import QuestLog from './QuestLog';
import { useGame } from '../context/GameContext';

function GameWorld({ currentScene, onSceneChange }) {
  const { state } = useGame();
  const [showQuestLog, setShowQuestLog] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Player Stats HUD */}
      <PlayerStats />
      
      {/* Quest Log Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowQuestLog(!showQuestLog)}
        className="fixed top-4 right-4 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow-lg"
      >
        Quests
      </motion.button>

      {/* Main Game Scene */}
      <SceneRenderer 
        currentScene={currentScene} 
        onSceneChange={onSceneChange}
      />

      {/* Dialogue System */}
      {state.ui.dialogueOpen && <DialogueSystem />}

      {/* Quest Log */}
      {showQuestLog && (
        <QuestLog onClose={() => setShowQuestLog(false)} />
      )}
    </div>
  );
}

export default GameWorld;