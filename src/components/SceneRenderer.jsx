import React from 'react';
import { motion } from 'framer-motion';
import LaboratoryScene from './scenes/LaboratoryScene';
import LibraryScene from './scenes/LibraryScene';
import ExperimentScene from './scenes/ExperimentScene';
import EinsteinOfficeScene from './scenes/EinsteinOfficeScene';

function SceneRenderer({ currentScene, onSceneChange }) {
  const renderScene = () => {
    switch (currentScene) {
      case 'intro':
      case 'laboratory':
        return <LaboratoryScene onSceneChange={onSceneChange} />;
      case 'library':
        return <LibraryScene onSceneChange={onSceneChange} />;
      case 'experiment':
        return <ExperimentScene onSceneChange={onSceneChange} />;
      case 'einstein_office':
        return <EinsteinOfficeScene onSceneChange={onSceneChange} />;
      default:
        return <LaboratoryScene onSceneChange={onSceneChange} />;
    }
  };

  return (
    <motion.div
      key={currentScene}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {renderScene()}
    </motion.div>
  );
}

export default SceneRenderer;