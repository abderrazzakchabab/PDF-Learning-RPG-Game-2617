import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useGame } from '../context/GameContext';

const { FiUser, FiZap, FiBook, FiEye, FiClock } = FiIcons;

function PlayerStats() {
  const { state } = useGame();
  const { player } = state;

  const knowledgeAreas = [
    { key: 'electrodynamics', name: 'Electrodynamics', icon: FiZap, color: 'text-yellow-400' },
    { key: 'relativity', name: 'Relativity', icon: FiClock, color: 'text-blue-400' },
    { key: 'lightSpeed', name: 'Light Speed', icon: FiEye, color: 'text-purple-400' },
    { key: 'spacetime', name: 'Spacetime', icon: FiBook, color: 'text-green-400' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-20 bg-black bg-opacity-70 backdrop-blur-md rounded-lg p-4 min-w-80"
    >
      {/* Player Info */}
      <div className="flex items-center gap-3 mb-4">
        <SafeIcon icon={FiUser} className="text-2xl text-purple-400" />
        <div>
          <h3 className="text-white font-bold text-lg">{player.name}</h3>
          <p className="text-gray-300 text-sm">Level {player.level}</p>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Experience</span>
          <span>{player.experience % 100}/100</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(player.experience % 100)}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Knowledge Areas */}
      <div className="space-y-2">
        <h4 className="text-gray-300 text-sm font-semibold">Knowledge</h4>
        {knowledgeAreas.map((area) => (
          <div key={area.key} className="flex items-center gap-2">
            <SafeIcon icon={area.icon} className={`text-sm ${area.color}`} />
            <span className="text-gray-300 text-sm flex-1">{area.name}</span>
            <span className="text-white text-sm font-semibold">
              {player.knowledge[area.key]}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default PlayerStats;