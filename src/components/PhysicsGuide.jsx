import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBook, FiX, FiZap, FiClock, FiTarget, FiAtom } = FiIcons;

function PhysicsGuide({ onClose }) {
  const concepts = [
    {
      id: 'relativity',
      title: 'Principle of Relativity',
      icon: FiClock,
      color: 'text-blue-400',
      content: 'The laws of physics are identical in all inertial reference frames. This means that the laws of physics observed by a person at rest are the same as those observed by a person moving at constant velocity.'
    },
    {
      id: 'light-speed',
      title: 'Constant Speed of Light',
      icon: FiZap,
      color: 'text-yellow-400',
      content: 'The speed of light in vacuum is constant (299,792,458 meters per second) regardless of the motion of the light source or observer. This seemingly simple fact has profound implications for our understanding of space and time.'
    },
    {
      id: 'time-dilation',
      title: 'Time Dilation',
      icon: FiClock,
      color: 'text-purple-400',
      content: 'Time passes more slowly for objects in motion relative to an observer. The faster an object moves, the slower time passes for it compared to a stationary observer. This effect becomes significant only at speeds approaching the speed of light.'
    },
    {
      id: 'length-contraction',
      title: 'Length Contraction',
      icon: FiTarget,
      color: 'text-green-400',
      content: 'Objects in motion appear shortened in the direction of motion. A meter stick moving at high speed would appear shorter than one meter when measured by a stationary observer.'
    },
    {
      id: 'mass-energy',
      title: 'Mass-Energy Equivalence',
      icon: FiAtom,
      color: 'text-orange-400',
      content: 'Einstein\'s famous equation E=mc² shows that mass and energy are equivalent forms of the same thing. A small amount of mass can be converted into an enormous amount of energy, as demonstrated in nuclear reactions.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-gradient-to-r from-gray-900 to-indigo-900 py-2 z-10">
          <div className="flex items-center gap-3">
            <SafeIcon icon={FiBook} className="text-3xl text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Physics Guide</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-black hover:bg-opacity-20 rounded-full"
          >
            <SafeIcon icon={FiX} className="text-2xl" />
          </button>
        </div>

        {/* Introduction */}
        <div className="mb-8 bg-black bg-opacity-30 p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-4">Einstein's Special Theory of Relativity</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            In 1905, Albert Einstein published his paper "On the Electrodynamics of Moving Bodies," introducing the special theory of relativity. This revolutionary theory changed our understanding of space and time, showing they are not absolute but relative to the observer's motion.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The theory is built on two fundamental postulates: the principle of relativity and the constancy of the speed of light. From these simple principles, Einstein derived consequences that seemed counterintuitive but have been confirmed by numerous experiments.
          </p>
        </div>

        {/* Concepts */}
        <div className="space-y-6">
          {concepts.map((concept) => (
            <motion.div
              key={concept.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black bg-opacity-30 p-6 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <SafeIcon icon={concept.icon} className={`text-3xl ${concept.color}`} />
                <h3 className="text-xl font-bold text-white">{concept.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {concept.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Further Reading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-purple-900 to-pink-900 p-6 rounded-xl"
        >
          <h3 className="text-xl font-bold text-white mb-4">Further Reading</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Einstein, A. (1905). "On the Electrodynamics of Moving Bodies"</li>
            <li>• Einstein, A. (1916). "Relativity: The Special and General Theory"</li>
            <li>• Feynman, R. (1963). "The Feynman Lectures on Physics, Vol. 1"</li>
            <li>• Greene, B. (2004). "The Fabric of the Cosmos"</li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default PhysicsGuide;