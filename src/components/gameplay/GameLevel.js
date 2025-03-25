import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNotification } from '../ui/Notification';
import GameBoard from './GameBoard';

/**
 * Данные об уровнях кампании
 */
const CAMPAIGN_LEVELS = [
  { name: 'Treachery', goal: { points: 1000, turns: 5 } },
  { name: 'Fraud', goal: { points: 1500, turns: 6 } },
  { name: 'Violence', goal: { points: 2000, turns: 6 } },
  { name: 'Heresy', goal: { points: 2500, turns: 7 } },
  { name: 'Wrath', goal: { points: 3000, turns: 7 } },
  { name: 'Greed', goal: { points: 3500, turns: 8 } },
  { name: 'Gluttony', goal: { points: 4000, turns: 8 } },
  { name: 'Lust', goal: { points: 4500, turns: 9 } },
  { name: 'Limbo', goal: { points: 5000, turns: 10 } },
  { name: 'Freedom', goal: { points: 6000, turns: 10 } }
];

/**
 * Компонент игрового уровня
 */
const GameLevel = ({ levelIndex, onComplete, onExit }) => {
  const { updateCampaignProgress, addSilver } = useUser();
  const { showNotification } = useNotification();
  
  // Получаем данные об уровне
  const levelData = {
    ...CAMPAIGN_LEVELS[levelIndex],
    index: levelIndex
  };
  
  // Обработчик завершения уровня
  const handleLevelComplete = (results) => {
    const { completed, score, turns, silverEarned } = results;
    
    // Сохраняем прогресс уровня
    updateCampaignProgress(levelIndex, completed, {
      score,
      turnsUsed: turns,
      silverEarned,
      attempts: 1 // В реальной игре нужно увеличивать счетчик попыток
    });
    
    // Добавляем заработанное серебро
    if (completed && silverEarned > 0) {
      addSilver(silverEarned);
      
      showNotification(
        'Silver Earned!',
        `You've earned ${silverEarned} silver for completing the level.`,
        'success'
      );
    }
    
    // Вызываем колбэк завершения
    if (onComplete) {
      onComplete(results);
    }
  };
  
  return (
    <GameBoard 
      level={levelData}
      onComplete={handleLevelComplete}
      onExit={onExit}
    />
  );
};

export default GameLevel;