import React, { useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../../contexts/UserContext';
import { Button, Container, Heading } from '../ui';

// Стилизованный контейнер для меню кампании
const CampaignContainer = styled(Container)`
  max-width: 800px;
  margin: 50px auto;
  padding: 2rem;
`;

// Стилизованный список уровней
const LevelsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

// Стилизованный уровень кампании
const LevelItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.unlocked ? 'rgba(171, 81, 46, 0.3)' : 'rgba(78, 66, 54, 0.5)'};
  border: 2px solid ${props => props.completed ? 'var(--yellow)' : props.unlocked ? 'var(--orange)' : 'var(--brown-beige)'};
  cursor: ${props => props.unlocked ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.unlocked ? 1 : 0.7};
  transition: all 0.2s ease;
  
  &:hover {
    transform: ${props => props.unlocked ? 'translateX(5px)' : 'none'};
    background-color: ${props => props.unlocked ? 'rgba(171, 81, 46, 0.4)' : 'rgba(78, 66, 54, 0.5)'};
  }
`;

// Наименование уровня с рунами для скрытых уровней
const LevelName = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.unlocked ? 'var(--light-beige)' : 'var(--brown-beige)'};
  
  ${props => !props.revealed && `
    font-family: 'Runic', fantasy;
    letter-spacing: 2px;
  `}
`;

// Статус уровня
const LevelStatus = styled.div`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.9rem;
  background-color: ${props => {
    if (props.status === 'completed') return 'rgba(0, 128, 0, 0.3)';
    if (props.status === 'unlocked') return 'rgba(237, 194, 39, 0.3)';
    return 'rgba(78, 66, 54, 0.5)';
  }};
  color: ${props => {
    if (props.status === 'completed') return 'var(--light-beige)';
    if (props.status === 'unlocked') return 'var(--yellow)';
    return 'var(--brown-beige)';
  }};
`;

/**
 * Данные об уровнях кампании
 */
const CAMPAIGN_LEVELS = [
  { name: 'Treachery', runicName: '✦✧✣✤✥', goal: { points: 1000, turns: 5 } },
  { name: 'Fraud', runicName: '✦✧✣✤', goal: { points: 1500, turns: 6 } },
  { name: 'Violence', runicName: '✩✪✫✬', goal: { points: 2000, turns: 6 } },
  { name: 'Heresy', runicName: '✮✯✰', goal: { points: 2500, turns: 7 } },
  { name: 'Wrath', runicName: '✱✲✳', goal: { points: 3000, turns: 7 } },
  { name: 'Greed', runicName: '✴✵✶', goal: { points: 3500, turns: 8 } },
  { name: 'Gluttony', runicName: '✷✸✹', goal: { points: 4000, turns: 8 } },
  { name: 'Lust', runicName: '✺✻✼', goal: { points: 4500, turns: 9 } },
  { name: 'Limbo', runicName: '✽✾✿', goal: { points: 5000, turns: 10 } },
  { name: 'Freedom', runicName: '❀❁❂', goal: { points: 6000, turns: 10 } }
];

/**
 * Компонент меню кампании с уровнями
 */
const CampaignMenu = ({ onNavigate, onBack }) => {
  const { campaignProgress } = useUser();
  const [selectedLevel, setSelectedLevel] = useState(null);
  
  // Функция для проверки, разблокирован ли уровень
  const isLevelUnlocked = (levelIndex) => {
    // Первый уровень всегда доступен
    if (levelIndex === 0) return true;
    
    // Остальные уровни доступны только если предыдущий пройден
    return campaignProgress && 
           campaignProgress[levelIndex - 1] && 
           campaignProgress[levelIndex - 1].completed;
  };
  
  // Функция для проверки, пройден ли уровень
  const isLevelCompleted = (levelIndex) => {
    return campaignProgress && 
           campaignProgress[levelIndex] && 
           campaignProgress[levelIndex].completed;
  };
  
  // Обработчик выбора уровня
  const handleLevelSelect = (levelIndex) => {
    if (isLevelUnlocked(levelIndex)) {
      setSelectedLevel(levelIndex);
      if (onNavigate) onNavigate('level', { levelIndex });
    }
  };
  
  return (
    <CampaignContainer>
      <Heading level="h2" color="secondary" align="center">
        Campaign ⚔️
      </Heading>
      
      <Heading level="h4" color="primary" align="center">
        Select your trial, brave soul...
      </Heading>
      
      <LevelsList>
        {CAMPAIGN_LEVELS.map((level, index) => {
          const unlocked = isLevelUnlocked(index);
          const completed = isLevelCompleted(index);
          const revealed = unlocked || completed;
          
          return (
            <LevelItem 
              key={index} 
              unlocked={unlocked}
              completed={completed}
              onClick={() => handleLevelSelect(index)}
            >
              <LevelName unlocked={unlocked} revealed={revealed}>
                {revealed ? `${index + 1}. ${level.name}` : `${index + 1}. ${level.runicName}`}
              </LevelName>
              
              <LevelStatus 
                status={completed ? 'completed' : unlocked ? 'unlocked' : 'locked'}
              >
                {completed ? 'Completed' : unlocked ? 'Unlocked' : 'Locked'}
              </LevelStatus>
            </LevelItem>
          );
        })}
      </LevelsList>
      
      <Button onClick={onBack}>Back</Button>
    </CampaignContainer>
  );
};

export default CampaignMenu;