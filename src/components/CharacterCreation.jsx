import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useGame } from '../context/GameContext';

const { FiUser, FiArrowRight, FiZap, FiBook, FiEye } = FiIcons;

function CharacterCreation({ onComplete }) {
  const { dispatch } = useGame();
  const [playerName, setPlayerName] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('theoretical');

  const backgrounds = [
    {
      id: 'theoretical',
      name: 'Theoretical Physicist',
      description: 'Strong foundation in mathematical physics and theoretical concepts',
      bonus: 'electrodynamics',
      icon: FiBook
    },
    {
      id: 'experimental',
      name: 'Experimental Physicist',
      description: 'Hands-on experience with laboratory equipment and measurements',
      bonus: 'lightSpeed',
      icon: FiZap
    },
    {
      id: 'observer',
      name: 'Keen Observer',
      description: 'Excellent at noticing patterns and making connections',
      bonus: 'spacetime',
      icon: FiEye
    }
  ];

  const handleStart = () => {
    if (playerName.trim()) {
      dispatch({ type: 'SET_PLAYER_NAME', payload: playerName });
      dispatch({ 
        type: 'INCREASE_KNOWLEDGE', 
        payload: { 
          subject: backgrounds.find(b => b.id === selectedBackground).bonus, 
          amount: 10 
        }
      });
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full"
      >
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Create Your Physicist
        </h2>

        {/* Name Input */}
        <div className="mb-8">
          <label className="block text-purple-200 text-lg font-semibold mb-3">
            What's your name?
          </label>
          <div className="relative">
            <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Background Selection */}
        <div className="mb-8">
          <label className="block text-purple-200 text-lg font-semibold mb-4">
            Choose your background:
          </label>
          <div className="space-y-3">
            {backgrounds.map((background) => (
              <motion.div
                key={background.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBackground(background.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedBackground === background.id
                    ? 'border-purple-500 bg-purple-900 bg-opacity-30'
                    : 'border-gray-600 bg-gray-800 bg-opacity-50 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-4">
                  <SafeIcon icon={background.icon} className="text-2xl text-purple-400" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">
                      {background.name}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                      {background.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs text-purple-300 bg-purple-900 bg-opacity-50 px-2 py-1 rounded">
                        +10 {background.bonus.charAt(0).toUpperCase() + background.bonus.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          disabled={!playerName.trim()}
          className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
            playerName.trim()
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Begin Your Journey
          <SafeIcon icon={FiArrowRight} className="text-xl" />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default CharacterCreation;