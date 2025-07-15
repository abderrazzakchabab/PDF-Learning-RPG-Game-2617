import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useGame } from '../../context/GameContext';

const { FiZap, FiEye, FiTarget, FiArrowLeft, FiPlay, FiPause } = FiIcons;

function ExperimentScene({ onSceneChange }) {
  const { state, dispatch } = useGame();
  const [experimentRunning, setExperimentRunning] = useState(false);
  const [experimentResults, setExperimentResults] = useState(null);

  const runLightSpeedExperiment = () => {
    setExperimentRunning(true);
    
    // Simulate experiment running
    setTimeout(() => {
      setExperimentRunning(false);
      setExperimentResults({
        speedMeasured: 299792458, // m/s
        direction1: 299792458,
        direction2: 299792458,
        conclusion: 'The speed of light is constant in all directions!'
      });
      
      dispatch({ type: 'INCREASE_KNOWLEDGE', payload: { subject: 'lightSpeed', amount: 15 } });
      dispatch({ type: 'GAIN_EXPERIENCE', payload: 25 });
      dispatch({ type: 'UNLOCK_CONCEPT', payload: 'light_speed_constant' });
      
      // Check if ready for Einstein's office
      if (state.player.knowledge.lightSpeed >= 20 && state.player.knowledge.electrodynamics >= 15) {
        dispatch({ type: 'UNLOCK_CONCEPT', payload: 'ready_for_einstein' });
      }
    }, 3000);
  };

  const runTimeDilationDemo = () => {
    dispatch({
      type: 'SET_DIALOGUE',
      payload: {
        speaker: 'Time Dilation Demonstration',
        text: 'Imagine two observers: one stationary and one moving at high speed. Due to the constant speed of light, time itself must slow down for the moving observer! This is time dilation.',
        choices: [
          {
            text: 'This is mind-bending!',
            action: () => {
              dispatch({ type: 'INCREASE_KNOWLEDGE', payload: { subject: 'spacetime', amount: 12 } });
              dispatch({ type: 'GAIN_EXPERIENCE', payload: 20 });
              dispatch({ type: 'UNLOCK_CONCEPT', payload: 'time_dilation' });
              dispatch({ type: 'CLOSE_DIALOGUE' });
            }
          },
          {
            text: 'I need to think about this...',
            action: () => dispatch({ type: 'CLOSE_DIALOGUE' })
          }
        ]
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
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
            Advanced Physics Experiments
          </h1>
          <p className="text-xl text-gray-300">
            Conduct groundbreaking experiments that reveal the nature of space and time
          </p>
        </motion.div>

        {/* Experiment Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Light Speed Experiment */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <SafeIcon icon={FiEye} className="text-3xl text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Light Speed Measurement</h3>
            </div>
            
            <p className="text-gray-300 mb-4">
              Measure the speed of light in different directions to test the ether theory
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runLightSpeedExperiment}
              disabled={experimentRunning}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                experimentRunning
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white'
              }`}
            >
              <SafeIcon icon={experimentRunning ? FiPause : FiPlay} />
              {experimentRunning ? 'Experiment Running...' : 'Run Experiment'}
            </motion.button>
          </motion.div>

          {/* Time Dilation Demo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <SafeIcon icon={FiZap} className="text-3xl text-purple-400" />
              <h3 className="text-xl font-bold text-white">Time Dilation Demo</h3>
            </div>
            
            <p className="text-gray-300 mb-4">
              Explore how time changes for observers moving at different speeds
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runTimeDilationDemo}
              className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300"
            >
              <SafeIcon icon={FiTarget} />
              Start Demonstration
            </motion.button>
          </motion.div>
        </div>

        {/* Experiment Results */}
        {experimentResults && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-900 to-teal-900 bg-opacity-80 backdrop-blur-lg rounded-lg p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Experiment Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300">Speed in Direction 1:</p>
                <p className="text-white font-mono text-lg">{experimentResults.direction1.toLocaleString()} m/s</p>
              </div>
              <div>
                <p className="text-gray-300">Speed in Direction 2:</p>
                <p className="text-white font-mono text-lg">{experimentResults.direction2.toLocaleString()} m/s</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-900 bg-opacity-50 rounded-lg">
              <p className="text-yellow-200 font-semibold">
                {experimentResults.conclusion}
              </p>
            </div>
          </motion.div>
        )}

        {/* Einstein's Office Access */}
        {state.gameProgress.unlockedConcepts.includes('ready_for_einstein') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-gold-900 to-yellow-900 bg-opacity-80 backdrop-blur-lg rounded-lg p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready for the Next Level!
            </h3>
            <p className="text-gray-300 mb-4">
              Your understanding of electrodynamics and light speed has reached a breakthrough point. 
              You're ready to meet Einstein himself and learn about his revolutionary theory!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSceneChange('einstein_office')}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Visit Einstein's Office
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ExperimentScene;