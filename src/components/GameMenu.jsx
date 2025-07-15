import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PhysicsGuide from './PhysicsGuide';

const { FiPlay, FiBook, FiSettings, FiZap } = FiIcons;

function GameMenu({ onStartGame }) {
  const [showPhysicsGuide, setShowPhysicsGuide] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        {/* Title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            Einstein's <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> {' '}Relativity </span>
          </h1>
          <h2 className="text-3xl text-purple-200 mb-6">RPG Adventure</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Journey through the revolutionary world of special relativity. Learn physics concepts by solving puzzles, conducting experiments, and discovering the secrets of space and time.
          </p>
        </motion.div>

        {/* Physics Formula Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12"
        >
          <div className="text-4xl text-yellow-300 font-mono mb-4">
            E=mc²
          </div>
          <div className="text-lg text-purple-200">
            "The most beautiful thing we can experience is the mysterious"
          </div>
        </motion.div>

        {/* Menu Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139,92,246,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg text-xl flex items-center justify-center gap-3 w-full max-w-md mx-auto transition-all duration-300"
          >
            <SafeIcon icon={FiPlay} className="text-2xl" />
            Start Adventure
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPhysicsGuide(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg flex items-center justify-center gap-3 w-full max-w-md mx-auto transition-all duration-300"
          >
            <SafeIcon icon={FiBook} className="text-xl" />
            Physics Guide
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-8 rounded-lg text-lg flex items-center justify-center gap-3 w-full max-w-md mx-auto transition-all duration-300"
          >
            <SafeIcon icon={FiSettings} className="text-xl" />
            Settings
          </motion.button>
        </motion.div>

        {/* Animated Physics Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex justify-center space-x-8"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-yellow-400 rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Physics Guide Modal */}
      <AnimatePresence>
        {showPhysicsGuide && (
          <PhysicsGuide onClose={() => setShowPhysicsGuide(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameMenu;