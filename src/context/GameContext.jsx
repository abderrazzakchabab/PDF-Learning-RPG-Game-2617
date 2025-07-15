import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  player: {
    name: 'Young Physicist',
    level: 1,
    experience: 0,
    knowledge: {
      electrodynamics: 0,
      relativity: 0,
      lightSpeed: 0,
      spacetime: 0
    },
    inventory: [],
    currentLocation: 'laboratory'
  },
  gameProgress: {
    completedQuests: [],
    unlockedConcepts: [],
    currentQuest: null
  },
  ui: {
    showInventory: false,
    showKnowledge: false,
    dialogueOpen: false,
    currentDialogue: null
  }
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        player: { ...state.player, name: action.payload }
      };
    
    case 'GAIN_EXPERIENCE':
      const newExp = state.player.experience + action.payload;
      const newLevel = Math.floor(newExp / 100) + 1;
      return {
        ...state,
        player: {
          ...state.player,
          experience: newExp,
          level: newLevel
        }
      };
    
    case 'INCREASE_KNOWLEDGE':
      return {
        ...state,
        player: {
          ...state.player,
          knowledge: {
            ...state.player.knowledge,
            [action.payload.subject]: state.player.knowledge[action.payload.subject] + action.payload.amount
          }
        }
      };
    
    case 'ADD_INVENTORY_ITEM':
      return {
        ...state,
        player: {
          ...state.player,
          inventory: [...state.player.inventory, action.payload]
        }
      };
    
    case 'COMPLETE_QUEST':
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          completedQuests: [...state.gameProgress.completedQuests, action.payload],
          currentQuest: null
        }
      };
    
    case 'START_QUEST':
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          currentQuest: action.payload
        }
      };
    
    case 'UNLOCK_CONCEPT':
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          unlockedConcepts: [...state.gameProgress.unlockedConcepts, action.payload]
        }
      };
    
    case 'TOGGLE_UI':
      return {
        ...state,
        ui: {
          ...state.ui,
          [action.payload]: !state.ui[action.payload]
        }
      };
    
    case 'SET_DIALOGUE':
      return {
        ...state,
        ui: {
          ...state.ui,
          dialogueOpen: true,
          currentDialogue: action.payload
        }
      };
    
    case 'CLOSE_DIALOGUE':
      return {
        ...state,
        ui: {
          ...state.ui,
          dialogueOpen: false,
          currentDialogue: null
        }
      };
    
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}