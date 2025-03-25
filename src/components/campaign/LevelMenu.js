import React from 'react';
import styled from 'styled-components';
import { useUser } from '../../contexts/UserContext';
import { Button, Container, Heading } from '../ui';

// Стилизованный контейнер для меню уровня
const LevelContainer = styled(Container)`
  max-width: 700px;
  margin: 50px auto;
  padding: 2rem;
`;

// Карточка с информацией о цели уровня
const GoalCard = styled.div`
  background-color: rgba(78, 66, 54, 0.6);
  border: 2px solid var(--orange);
  border-radius: var(--border-radius-sm);
  padding: 1rem;
  margin: 1.5rem 0;
`;

// Строка с целью
const GoalItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  
  span:last-child {
    font-weight: bold;
    color: var(--yellow);
  }
`;

// Контейнер для кнопок
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
`;

// Контейнер для информации о статистике прохождения
const StatsContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(237, 194, 39, 0.2);
  border-radius: var(--border-radius-sm);
  
  h4 {
    margin-bottom: 0.5rem;
    color: var(--yellow);
  }
`;

// Строка со статистикой
const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  
  span:last-child {
    font-weight: bold;
  }
`;

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
 * Компонент для меню конкретного уровня
 */
const LevelMenu = ({ levelIndex, onNavigate, onBack }) => {
  const { campaignProgress } = useUser();
  
  // Получаем данные об уровне
  const level = CAMPAIGN_LEVELS[levelIndex];
  
  // Проверяем, есть ли данные о прохождении
  const isCompleted = campaignProgress && 
                      campaignProgress[levelIndex] && 
                      campaignProgress[levelIndex].completed;
  
  // Получаем статистику прохождения, если уровень был пройден
  const stats = isCompleted && campaignProgress[levelIndex].stats;
  
  // Обработчик для начала игры
  const handleBeginLevel = () => {
    if (onNavigate) onNavigate('play-level', { levelIndex });
  };
  
  // Обработчик для просмотра лора уровня
  const handleViewLore = () => {
    if (onNavigate) onNavigate('level-lore', { levelIndex });
  };
  
  return (
    <LevelContainer>
      <Heading level="h2" color="secondary" align="center">
        Level {levelIndex + 1}: {level.name}
      </Heading>
      
      <GoalCard>
        <GoalItem>
          <span>Goal:</span>
          <span>Earn {level.goal.points} points in {level.goal.turns} turns.</span>
        </GoalItem>
      </GoalCard>
      
      {isCompleted && stats && (
        <StatsContainer>
          <Heading level="h4" align="center">Level Statistics</Heading>
          <StatItem>
            <span>Attempts:</span>
            <span>{stats.attempts || 1}</span>
          </StatItem>
          <StatItem>
            <span>Silver earned:</span>
            <span>{stats.silverEarned || 0}</span>
          </StatItem>
          <StatItem>
            <span>Turns used:</span>
            <span>{stats.turnsUsed || level.goal.turns}</span>
          </StatItem>
        </StatsContainer>
      )}
      
      <ButtonGroup>
        <Button onClick={handleBeginLevel}>Begin</Button>
        <Button variant="secondary" onClick={handleViewLore}>Lore</Button>
        <Button variant="secondary" onClick={onBack}>Back</Button>
      </ButtonGroup>
    </LevelContainer>
  );
};

export default LevelMenu;