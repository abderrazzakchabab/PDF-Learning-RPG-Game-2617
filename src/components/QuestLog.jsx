import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useGame } from '../context/GameContext';

const { FiBook, FiX, FiCheck, FiClock } = FiIcons;

function QuestLog({ onClose }) {
  const { state } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 max-w-3xl w-full max-h-96 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <SafeIcon icon={FiBook} className="text-2xl text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Quest Log</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        {/* Current Quest */}
        {state.gameProgress.currentQuest && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <SafeIcon icon={FiClock} className="text-sm" />
              Current Quest
            </h3>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">
                {state.gameProgress.currentQuest.title}
              </h4>
              <p className="text-gray-300 mb-3">
                {state.gameProgress.currentQuest.description}
              </p>
              <div className="space-y-1">
                {state.gameProgress.currentQuest.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Completed Quests */}
        {state.gameProgress.completedQuests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-green-400 mb-2 flex items-center gap-2">
              <SafeIcon icon={FiCheck} className="text-sm" />
              Completed Quests
            </h3>
            <div className="space-y-2">
              {state.gameProgress.completedQuests.map((quest, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3">
                  <h4 className="text-white font-semibold">{quest}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unlocked Concepts */}
        {state.gameProgress.unlockedConcepts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Concepts Mastered
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {state.gameProgress.unlockedConcepts.map((concept, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3">
                  <span className="text-gray-300 text-sm capitalize">
                    {concept.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!state.gameProgress.currentQuest && 
         state.gameProgress.completedQuests.length === 0 && 
         state.gameProgress.unlockedConcepts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No quests or achievements yet. Start your adventure!</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default QuestLog;