import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useGame } from '../../context/GameContext';

const { FiBook, FiFileText, FiUsers, FiArrowLeft } = FiIcons;

function LibraryScene({ onSceneChange }) {
  const { state, dispatch } = useGame();

  const handleBookStudy = (book) => {
    switch (book) {
      case 'maxwell':
        dispatch({
          type: 'SET_DIALOGUE',
          payload: {
            speaker: 'Maxwell\'s Treatise',
            text: 'Maxwell unified electricity and magnetism into a single theory. His equations predict that electromagnetic waves travel at the speed of light - suggesting light itself is an electromagnetic wave!',
            choices: [
              {
                text: 'Study electromagnetic wave theory',
                action: () => {
                  dispatch({ type: 'INCREASE_KNOWLEDGE', payload: { subject: 'electrodynamics', amount: 8 } });
                  dispatch({ type: 'GAIN_EXPERIENCE', payload: 15 });
                  dispatch({ type: 'UNLOCK_CONCEPT', payload: 'electromagnetic_waves' });
                  dispatch({ type: 'CLOSE_DIALOGUE' });
                }
              },
              {
                text: 'Continue browsing',
                action: () => dispatch({ type: 'CLOSE_DIALOGUE' })
              }
            ]
          }
        });
        break;
      
      case 'lorentz':
        dispatch({
          type: 'SET_DIALOGUE',
          payload: {
            speaker: 'Lorentz\'s Papers',
            text: 'Lorentz proposed that objects contract in the direction of motion through the "ether." But there\'s a problem - no experiment has ever detected this mysterious ether!',
            choices: [
              {
                text: 'Study the ether problem',
                action: () => {
                  dispatch({ type: 'INCREASE_KNOWLEDGE', payload: { subject: 'relativity', amount: 6 } });
                  dispatch({ type: 'GAIN_EXPERIENCE', payload: 12 });
                  dispatch({ type: 'UNLOCK_CONCEPT', payload: 'ether_problem' });
                  dispatch({ type: 'CLOSE_DIALOGUE' });
                }
              },
              {
                text: 'Look for other theories',
                action: () => dispatch({ type: 'CLOSE_DIALOGUE' })
              }
            ]
          }
        });
        break;
      
      case 'michelson':
        dispatch({
          type: 'SET_DIALOGUE',
          payload: {
            speaker: 'Michelson-Morley Experiment',
            text: 'This famous experiment tried to detect Earth\'s motion through the ether by measuring light speed in different directions. The shocking result: light speed is the same in all directions!',
            choices: [
              {
                text: 'Analyze the experimental results',
                action: () => {
                  dispatch({ type: 'INCREASE_KNOWLEDGE', payload: { subject: 'lightSpeed', amount: 10 } });
                  dispatch({ type: 'GAIN_EXPERIENCE', payload: 20 });
                  dispatch({ type: 'UNLOCK_CONCEPT', payload: 'constant_light_speed' });
                  dispatch({ type: 'CLOSE_DIALOGUE' });
                }
              },
              {
                text: 'This seems impossible...',
                action: () => dispatch({ type: 'CLOSE_DIALOGUE' })
              }
            ]
          }
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Back Button */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSceneChange('laboratory')}
          className="mb-6 flex items-center gap-2 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg px-4 py-2 text-white hover:bg-opacity-70 transition-all duration-300"
        >
          <SafeIcon icon={FiArrowLeft} />
          Back to Laboratory
        </motion.button>

        {/* Scene Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Physics Library - 1905
          </h1>
          <p className="text-xl text-gray-300">
            Study the foundational works that led to Einstein's breakthrough
          </p>
        </motion.div>

        {/* Library Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Maxwell's Work */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookStudy('maxwell')}
            className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all duration-300"
          >
            <SafeIcon icon={FiBook} className="text-4xl text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Maxwell's Treatise</h3>
            <p className="text-gray-300">
              "A Treatise on Electricity and Magnetism" - The foundation of electromagnetic theory
            </p>
            <div className="mt-4 text-sm text-amber-300">
              +8 Electrodynamics Knowledge
            </div>
          </motion.div>

          {/* Lorentz's Papers */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookStudy('lorentz')}
            className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all duration-300"
          >
            <SafeIcon icon={FiFileText} className="text-4xl text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Lorentz's Theory</h3>
            <p className="text-gray-300">
              Studies on the ether and the transformation of coordinates in electromagnetic theory
            </p>
            <div className="mt-4 text-sm text-blue-300">
              +6 Relativity Knowledge
            </div>
          </motion.div>

          {/* Michelson-Morley */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookStudy('michelson')}
            className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all duration-300"
          >
            <SafeIcon icon={FiUsers} className="text-4xl text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Michelson-Morley Experiment</h3>
            <p className="text-gray-300">
              The famous experiment that failed to detect the ether - a crucial puzzle piece
            </p>
            <div className="mt-4 text-sm text-purple-300">
              +10 Light Speed Knowledge
            </div>
          </motion.div>
        </div>

        {/* Unlocked Concepts Display */}
        {state.gameProgress.unlockedConcepts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-r from-green-900 to-teal-900 bg-opacity-80 backdrop-blur-lg rounded-lg p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Concepts Mastered
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.gameProgress.unlockedConcepts.map((concept, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 capitalize">
                    {concept.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default LibraryScene;