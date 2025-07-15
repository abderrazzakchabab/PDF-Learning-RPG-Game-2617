import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useGame } from '../context/GameContext';

const { FiMessageCircle, FiX } = FiIcons;

function DialogueSystem() {
  const { state, dispatch } = useGame();
  const { currentDialogue } = state.ui;

  if (!currentDialogue) return null;

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
        className="bg-black bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <SafeIcon icon={FiMessageCircle} className="text-2xl text-blue-400" />
            <h3 className="text-xl font-bold text-white">
              {currentDialogue.speaker}
            </h3>
          </div>
          <button
            onClick={() => dispatch({ type: 'CLOSE_DIALOGUE' })}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        {/* Dialogue Text */}
        <div className="mb-6">
          <p className="text-gray-300 leading-relaxed">
            {currentDialogue.text}
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          {currentDialogue.choices.map((choice, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={choice.action}
              className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 border border-gray-600 hover:border-gray-500"
            >
              <span className="text-white">{choice.text}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DialogueSystem;