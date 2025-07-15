import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useGame } from '../../context/GameContext';

const { FiUser, FiBookOpen, FiZap, FiClock, FiArrowLeft } = FiIcons;

function EinsteinOfficeScene({ onSceneChange }) {
  const { state, dispatch } = useGame();
  const [conversationStage, setConversationStage] = useState('greeting');

  const handleEinsteinConversation = (topic) => {
    switch (topic) {
      case 'relativity_principle':
        dispatch({
          type: 'SET_DIALOGUE',
          payload: {
            speaker: 'Albert Einstein',
            text: 'The laws of physics must be the same in all inertial reference frames. This is the principle of relativity. But combined with the constant speed of light, it leads to remarkable consequences!',
            choices: [
              {
                text: 'What consequences?',
                action: () => {
                  dispatch({ type: 'INCREASE_KNOWLEDGE', payload: { subject: 'relativity', amount: 20 } });
                  dispatch({ type: 'GAIN_EXPERIENCE', payload: 30 });
                  dispatch({ type: 'UNLOCK_CONCEPT', payload: 'relativity_principle' });
                  setConversationStage('time_space');
                  dispatch({ type: 'CLOSE_DIALOGUE' });
                }
              },
              {
                text: 'This is confusing...',
                action: () => dispatch({ type: 'CLOSE_DIALOGUE' })
              }
            ]
          }
        });
        break;
      
      case 'time_space':
        dispatch({
          type: 'SET_DIALOGUE',
          payload: {
            speaker: 'Albert Einstein',
            text: 'Time and space are not separate entities - they are unified into spacetime! When you move through space, you also move through time. The faster you go, the slower time passes for you relative to a stationary observer.',
            choices: [
              {
                text: 'Show me the mathematics',
                action: () => {
                  dispatch({ type: 'INCREASE_KNOWLEDGE', payload: { subject: 'spacetime', amount: 25 } });
                  dispatch({ type: 'GAIN_EXPERIENCE', payload: 40 });
                  dispatch({ type: 'UNLOCK_CONCEPT', payload: 'spacetime_unity' });
                  setConversationStage('energy_mass');
                  dispatch({ type: 'CLOSE_DIALOGUE' });
                }
              },
              {
                text: 'This changes everything!',
                action: () => dispatch({ type: 'CLOSE_DIALOGUE' })
              }
            ]
          }
        });
        break;
      
      case 'energy_mass':
        dispatch({
          type: 'SET_DIALOGUE',
          payload: {
            speaker: 'Albert Einstein',
            text: 'And here is perhaps the most famous consequence: Energy and mass are equivalent! E = mc². A small amount of mass can be converted into an enormous amount of energy, because c² is such a large number.',
            choices: [
              {
                text: 'This will change the world!',
                action: () => {
                  dispatch({ type: 'INCREASE_KNOWLEDGE', payload: { subject: 'relativity', amount: 30 } });
                  dispatch({ type: 'GAIN_EXPERIENCE', payload: 50 });
                  dispatch({ type: 'UNLOCK_CONCEPT', payload: 'mass_energy_equivalence' });
                  dispatch({ type: 'COMPLETE_QUEST', payload: 'relativity_mastery' });
                  setConversationStage('completed');
                  dispatch({ type: 'CLOSE_DIALOGUE' });
                }
              },
              {
                text: 'The implications are staggering...',
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
            Einstein's Office - Patent Office, Bern
          </h1>
          <p className="text-xl text-gray-300">
            Meet the genius who revolutionized our understanding of space and time
          </p>
        </motion.div>

        {/* Einstein Character */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-8 max-w-md text-center">
            <SafeIcon icon={FiUser} className="text-6xl text-yellow-400 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-white mb-2">Albert Einstein</h2>
            <p className="text-gray-300 mb-4">
              "Imagination is more important than knowledge. Knowledge is limited, imagination embraces the entire world."
            </p>
          </div>
        </motion.div>

        {/* Conversation Topics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEinsteinConversation('relativity_principle')}
            className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all duration-300"
          >
            <SafeIcon icon={FiBookOpen} className="text-4xl text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Principle of Relativity</h3>
            <p className="text-gray-300">
              Learn about the fundamental principle that all inertial reference frames are equivalent
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEinsteinConversation('time_space')}
            className={`bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all duration-300 ${
              conversationStage === 'greeting' ? 'opacity-50' : ''
            }`}
          >
            <SafeIcon icon={FiClock} className="text-4xl text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Spacetime Unity</h3>
            <p className="text-gray-300">
              Discover how space and time are unified into a single fabric of reality
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEinsteinConversation('energy_mass')}
            className={`bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all duration-300 ${
              conversationStage !== 'energy_mass' && conversationStage !== 'completed' ? 'opacity-50' : ''
            }`}
          >
            <SafeIcon icon={FiZap} className="text-4xl text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">E = mc²</h3>
            <p className="text-gray-300">
              Explore the most famous equation in physics and its profound implications
            </p>
          </motion.div>
        </div>

        {/* Achievement Display */}
        {conversationStage === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-gold-900 to-yellow-900 bg-opacity-80 backdrop-blur-lg rounded-lg p-8 text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              🎉 Congratulations! 🎉
            </h3>
            <p className="text-xl text-gray-300 mb-4">
              You have mastered the fundamentals of Einstein's Special Theory of Relativity!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <h4 className="text-white font-semibold">Electrodynamics</h4>
                <p className="text-2xl text-yellow-400">{state.player.knowledge.electrodynamics}</p>
              </div>
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <h4 className="text-white font-semibold">Relativity</h4>
                <p className="text-2xl text-blue-400">{state.player.knowledge.relativity}</p>
              </div>
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <h4 className="text-white font-semibold">Light Speed</h4>
                <p className="text-2xl text-purple-400">{state.player.knowledge.lightSpeed}</p>
              </div>
              <div className="bg-black bg-opacity-30 rounded-lg p-4">
                <h4 className="text-white font-semibold">Spacetime</h4>
                <p className="text-2xl text-green-400">{state.player.knowledge.spacetime}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default EinsteinOfficeScene;