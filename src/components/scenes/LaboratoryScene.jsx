import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useGame } from '../../context/GameContext';

const { FiZap, FiBook, FiEye, FiArrowRight } = FiIcons;

function LaboratoryScene({ onSceneChange }) {
  const { state, dispatch } = useGame();

  useEffect(() => {
    // Start the introductory quest
    if (!state.gameProgress.currentQuest) {
      dispatch({
        type: 'START_QUEST',
        payload: {
          id: 'intro_quest',
          title: 'Understanding Electrodynamics',
          description: 'Learn the basics of electromagnetic theory that Einstein built upon.',
          objectives: [
            'Examine the electromagnetic equipment',
            'Study Maxwell\'s equations',
            'Understand the problem of moving reference frames'
          ]
        }
      });
    }
  }, [state.gameProgress.currentQuest, dispatch]);

  const handleInteraction = (item) => {
    switch (item) {
      case 'equipment':
        dispatch({
          type: 'SET_DIALOGUE',
          payload: {
            speaker: 'Laboratory Equipment',
            text: 'This electromagnetic apparatus demonstrates the behavior of electric and magnetic fields. Notice how the fields interact - this is the foundation of Maxwell\'s equations.',
            choices: [
              {
                text: 'Study the electromagnetic fields',
                action: () => {
                  dispatch({ type: 'INCREASE_KNOWLEDGE', payload: { subject: 'electrodynamics', amount: 5 } });
                  dispatch({ type: 'GAIN_EXPERIENCE', payload: 10 });
                  dispatch({ type: 'CLOSE_DIALOGUE' });
                }
              },
              {
                text: 'Continue exploring',
                action: () => dispatch({ type: 'CLOSE_DIALOGUE' })
              }
            ]
          }
        });
        break;
      
      case 'library':
        onSceneChange('library');
        break;
      
      case 'experiment':
        if (state.player.knowledge.electrodynamics >= 10) {
          onSceneChange('experiment');
        } else {
          dispatch({
            type: 'SET_DIALOGUE',
            payload: {
              speaker: 'System',
              text: 'You need more knowledge in electrodynamics before attempting this experiment. Study the equipment first!',
              choices: [
                {
                  text: 'Understood',
                  action: () => dispatch({ type: 'CLOSE_DIALOGUE' })
                }
              ]
            }
          });
        }
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Scene Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Physics Laboratory - 1905
          </h1>
          <p className="text-xl text-gray-300">
            Welcome to your laboratory where you'll explore the mysteries of electrodynamics
          </p>
        </motion.div>

        {/* Interactive Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Electromagnetic Equipment */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleInteraction('equipment')}
            className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all duration-300"
          >
            <SafeIcon icon={FiZap} className="text-4xl text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Electromagnetic Apparatus</h3>
            <p className="text-gray-300">
              Study the behavior of electric and magnetic fields. This equipment will help you understand Maxwell's equations.
            </p>
          </motion.div>

          {/* Library Access */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleInteraction('library')}
            className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all duration-300"
          >
            <SafeIcon icon={FiBook} className="text-4xl text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Physics Library</h3>
            <p className="text-gray-300">
              Access the latest physics papers and theories. Study the work of Maxwell, Lorentz, and others.
            </p>
          </motion.div>

          {/* Advanced Experiment */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleInteraction('experiment')}
            className={`bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all duration-300 ${
              state.player.knowledge.electrodynamics < 10 ? 'opacity-50' : ''
            }`}
          >
            <SafeIcon icon={FiEye} className="text-4xl text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Light Speed Experiment</h3>
            <p className="text-gray-300">
              Conduct experiments to measure the speed of light. Requires basic electrodynamics knowledge.
            </p>
            {state.player.knowledge.electrodynamics < 10 && (
              <p className="text-red-400 text-sm mt-2">
                Requires 10+ Electrodynamics knowledge
              </p>
            )}
          </motion.div>
        </div>

        {/* Current Quest Display */}
        {state.gameProgress.currentQuest && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-lg rounded-lg p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              Current Quest: {state.gameProgress.currentQuest.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {state.gameProgress.currentQuest.description}
            </p>
            <div className="space-y-2">
              {state.gameProgress.currentQuest.objectives.map((objective, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">{objective}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default LaboratoryScene;